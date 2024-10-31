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
    CardTitle,
    CardHeader,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Navv from '../Navv'
import Footer from '../Footer'
import axios from 'axios'
import { URL } from '../../global'
import { toast } from 'react-toastify'

/**
 * This component displays the Signup page of our application with added authentication.
 */

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

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                // Sending a POST request for signup
                const response = await axios.post(`${URL}/signup`, formData)

                // Extract token from response
                const { token } = response.data

                // Store the token in localStorage and set auth flag
                if (token) {
                    localStorage.setItem('authToken', token)
                    localStorage.setItem('auth', 'true')

                    // Notify the user and navigate to dashboard or login
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
