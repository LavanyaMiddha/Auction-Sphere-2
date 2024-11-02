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

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${URL}/forgot-password`, {
                email,
            })
            if (response.data.message === 'Reset link sent') {
                toast.success(
                    'Password reset link has been sent to your email.'
                )
            } else {
                toast.error('Email not found.')
            }
        } catch (error) {
            toast.error('Something went wrong.')
            console.log(error)
        }
    }

    return (
        <div>
            <Card body className="mx-auto" style={{ width: '60%' }}>
                <CardHeader>
                    <h3>Forgot Password?</h3>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="Email">Email</Label>
                                <Input
                                    id="Email"
                                    name="email"
                                    placeholder="Enter your registered email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <Button color="primary">Send Reset Link</Button>
                        </Form>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default ForgotPassword