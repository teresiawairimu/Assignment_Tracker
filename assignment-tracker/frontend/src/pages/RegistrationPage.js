import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth, createUserWithEmailAndPassword } from '../firebaseConfig';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import {registerUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

const RegistrationForm = () => {
    const [registrationErrors, setRegistrationErrors] = useState([]);
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        //const { username, email, password } = data;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                data.email, 
                data.password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            console.log("User registered:", user);
            await registerUser({ username: data.username, email: data.email}, idToken );
            navigate('/login');
            //reset(); // Reset the form after successful registration
        } catch (error) {
            setRegistrationErrors([error.message]);
            console.log("Error registering user:", error.message);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            {...register('username')}
                            isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type="Email"
                            placeholder="Enter your email"
                            {...register('email')}
                            isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            {...register('password')}
                            isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mt-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="Confirm your password"
                            {...register('confirmPassword')}
                            isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {registrationErrors.length > 0 && (
                            <Alert variant="danger" className="mt-3">
                            {registrationErrors.map((error, index) => (
                                <p key={index}>
                                    {error}
                                </p>
                            ))}
                            </Alert>
                            )}
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Register
                        </Button>
                        <p className="text-center mt-3">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

               
            
export default RegistrationForm;