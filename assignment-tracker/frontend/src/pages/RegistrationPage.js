import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth, createUserWithEmailAndPassword } from '../firebaseConfig';
import {registerUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TextInput from '../components/form/inputs/TextInput';
import FormLayout from '../components/form/layout/FormLayout';
import SubmitButton from '../components/form/buttons/SubmitButton';


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
        <FormLayout title="Register">

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    label="Username"
                    name="username"
                    register={register}
                    placeholder="Enter your username"
                    error={errors.username}
                />

                <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    placeholder="Enter your email"
                    error={errors.email}
                />

                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    placeholder="Enter your password"
                    error={errors.password}
                />
            
                <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    register={register}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                />

                <SubmitButton
                    label="Register"
                />

                {registrationErrors.length > 0 && (
                    <div className="error-messages">
                        {registrationErrors.map((error, index) => (
                            <p key={index}>
                                {error}
                            </p>
                        ))}
                    </div>
                )}   
                
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </FormLayout>
    );
};

export default RegistrationForm;