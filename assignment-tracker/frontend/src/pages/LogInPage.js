import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth, signInWithEmailAndPassword } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

const LogInPage = () => {
    const [loginError, setLoginError] = useState(null);
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error ogging:", error);
            if (error.code === 'auth/user-not-found') {
                setLoginError('No account found with this email address');
            } else if (error.code === 'auth/wrong-password') {
                setLoginError('Password is incorrect');
            } else {
                setLoginError('An error occurred. Please try again later');
            }
        }
    };
    return (
        <Container className="justify-content-center">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                             type="email"
                             placeholder="Enter your email"
                             {...register('email')}
                            isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
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
                        {loginError && (
                            <Alert variant="danger" className="mt-3">
                            {loginError}</Alert>
                            )}

                           
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Login
                        </Button>
                        <p className="text-center mt-3">
                        Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LogInPage;