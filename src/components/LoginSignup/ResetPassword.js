import React, { useState } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
} from 'reactstrap'
import axios from 'axios'
import { URL } from '../../global'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        try {
            const response = await axios.post(`${URL}/reset-password`, {
                token,
                password: formData.password,
            })
            if (response.data.message === 'Password reset successful') {
                toast.success('Password has been reset successfully.')
                navigate('/login')
            } else {
                toast.error('Token is invalid or expired')
            }
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        }
    }

    return (
        <div>
            <Card body className="mx-auto" style={{ width: '60%' }}>
                <CardHeader>
                    <h3>Reset Password</h3>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="Password">New Password</Label>
                                <Input
                                    id="Password"
                                    name="password"
                                    placeholder="Enter new password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ConfirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="ConfirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your new password"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button color="primary">Reset Password</Button>
                        </Form>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default ResetPassword
