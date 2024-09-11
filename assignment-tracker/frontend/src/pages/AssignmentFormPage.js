import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../components/form/inputs/TextInput';
import FormLayout from '../components/form/layout/FormLayout';
import SubmitButton from '../components/form/buttons/SubmitButton';
import { useAuth } from '../contexts/AuthContext';
import { createAssignment } from '../services/assignmentService';

const schema = yup.object().shape({
    name: yup.string().required('The assignment name is required'),
    description: yup.string(),
    dueDate: yup.date().required('The due date is required')
});

const AssignmentPage = () => {
    const [assignmentErrors, setAssignmentErrors] = useState([]);
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
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
            await createAssignment(currentUser.uid, data, idToken);
            setAssignmentErrors([]);
        } catch (error) {
            setAssignmentErrors([error.message]);
        } finally {
            setIsLoading(false);
        }
    }; 
    
    if (isLoading) return <p>Loading...</p>;
 
    return (
        <FormLayout title="Assignment Page">
            <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        label="name"
                        name="name"
                        register={register}
                        placeholder="Enter the assignment's name"
                        error={errors.name}
                    />
                    <TextInput
                        label="description"
                        name="description"
                        type="textarea"
                        register={register}
                        placeholder="Enter the description"
                        error={errors.description}
                    />
                    <TextInput
                        label="dueDate"
                        name="dueDate"
                        type="date"
                        register={register}
                        error={errors.dueDate}
                    />
                        <div>
                            <SubmitButton label="Add" />
                            <button type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                   
                {assignmentErrors.length > 0 && assignmentErrors.map((error, index) => <p key={index}>{error}</p>)}
            </form>
        </FormLayout>
    );
};

export default AssignmentPage;