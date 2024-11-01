import React, { useState } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    CardText,
    CardHeader,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Navv from '../Navv'
import Footer from '../Footer'
import axios from 'axios'
import { URL } from '../../global'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
        } else if (!passwordRegex.test(formData.password)) {
            toast.error(
                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            )
        } else {
            try {
                const response = await axios.post(`${URL}/signup`, formData)
                const { token } = response.data

                if (token) {
                    localStorage.setItem('authToken', token)
                    localStorage.setItem('auth', 'true')
                    toast.success('Signup successful!')
                    navigate('/dashboard')
                }
            } catch (e) {
                toast.error('Something went wrong')
                console.log(e)
            }
        }
    }

    return (
        <div>
            <Navv />
            {localStorage.getItem('auth') === 'true' ? (
                <p>You are already signed in.</p>
            ) : (
                <Card body className="mx-auto" style={{ width: '60%' }}>
                    <CardHeader>
                        <h3>Sign up and bid away!</h3>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="FirstName">First Name</Label>
                                    <Input
                                        id="FirstName"
                                        name="firstName"
                                        placeholder="Your first name"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="LastName">Last Name</Label>
                                    <Input
                                        id="LastName"
                                        name="lastName"
                                        placeholder="Your last name"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Contact">Contact</Label>
                                    <Input
                                        id="Contact"
                                        name="contact"
                                        placeholder="Contact information"
                                        type="text"
                                        value={formData.contact}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Email">Email</Label>
                                    <Input
                                        id="Email"
                                        name="email"
                                        placeholder="Your email address"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Password">Password</Label>
                                    <Input
                                        id="Password"
                                        name="password"
                                        placeholder="Create a password"
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
                                        placeholder="Confirm your password"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <Button color="primary">Submit</Button>
                            </Form>
                        </CardText>
                    </CardBody>
                </Card>
            )}
            <Footer />
        </div>
    )
}

export default Signup
