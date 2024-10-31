import React, { useState } from 'react';
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
} from 'reactstrap';
import axios from 'axios';
import Navv from '../Navv';
import Footer from '../Footer';
import { URL } from '../../global';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL}/login`, formData);
            const { token, message } = response.data;

            if (message === 'Logged in successfully' && token) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('auth', 'true');
                localStorage.setItem('email', formData.email);

                toast.success('Login successful!');
                navigate('/products');
            } else {
                toast.error('Invalid credentials!');
            }
        } catch (e) {
            toast.error('Something went wrong');
            console.log(e);
        }
    };

    return (
        <div>
            <Navv />
            <Card body className="mx-auto" style={{ width: '60%' }}>
                <CardHeader>
                    <h3>Welcome! Login to continue</h3>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="Email">Email</Label>
                                <Input
                                    id="Email"
                                    name="email"
                                    placeholder="The email you registered with us"
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
                                    placeholder="Your password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button color="primary">Submit</Button>
                        </Form>
                        <Link to="/forgot-password" style={{ marginTop: '1rem', display: 'block' }}>
                            Forgot Password?
                        </Link>
                    </CardText>
                </CardBody>
            </Card>
            <div style={{ marginTop: '25rem', marginRight: '2rem' }}>
                <Footer />
            </div>
        </div>
    );
};

export default Login;
