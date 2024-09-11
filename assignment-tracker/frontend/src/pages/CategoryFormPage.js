import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../components/form/inputs/TextInput';
import FormLayout from '../components/form/layout/FormLayout';
import SubmitButton from '../components/form/buttons/SubmitButton';
import { useAuth } from '../contexts/AuthContext';
import { createCategory } from '../services/categoryService';


const schema = yup.object().shape({
    name: yup.string().required('The assignment name is required'),
});

const CategoryFormPage = () => {
    const [categoryErrors, setCategoryErrors] = useState([]);
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });


    const handleCancel = () => {
        reset();
        navigate('/dashboard');
    }

    
    const onSubmit = async (data) => {
        if (!currentUser) return;
        setIsLoading(true);
        try {
            const idToken = await currentUser.getIdToken();
            await createCategory(currentUser.uid, data, idToken);
            setCategoryErrors([]);
        } catch (error) {
            setCategoryErrors([error.message]);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <FormLayout title="Create Categories">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput 
                label="name"
                name="name"
                register = {register} 
                placeholder="Category name"
                error={errors.name} 

            />
            
            <div>
                <SubmitButton label="Add" />
                <button type="button" onClick={handleCancel}>Cancel</button> 
            </div>
            {categoryErrors.length > 0 && categoryErrors.map((error, index) => <p key={index}>{error}</p>)}
            </form>
        </FormLayout>
    );
};

export default CategoryFormPage;