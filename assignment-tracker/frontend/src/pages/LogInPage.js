import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth, signInWithEmailAndPassword } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/form/inputs/TextInput';
import FormLayout from '../components/form/layout/FormLayout';
import SubmitButton from '../components/form/buttons/SubmitButton';
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
            setLoginError(error.message);
            console.log("Error logging in:", error.message);
        }
    };
    return (
        <FormLayout title="Login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    label="Email"
                    name="email"
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
                <SubmitButton
                label="Login"
                 />
                {loginError && <p className="text-red-500">{loginError}</p>}
                <p>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </form>
        </FormLayout>
    );
};

export default LogInPage;