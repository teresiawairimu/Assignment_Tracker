import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Col, Row, Spinner, Alert, Container } from 'react-bootstrap'; 
import { useAuth } from '../../contexts/AuthContext';
import { createAssignment, updateAssignment, getAssignmentById } from '../../services/assignmentService';
import { getCategories } from '../../services/categoryService';

const schema = yup.object().shape({
    name: yup.string().required('The assignment name is required'),
    description: yup.string(),
    dueDate: yup.date()
        .required('The due date is required')
        .min(new Date(), 'The due date must be in the future'),
    category: yup.string().nullable()
});

const AssignmentPage = () => {
    const [assignmentErrors, setAssignmentErrors] = useState([]);
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const idToken = await currentUser.getIdToken();
                const categoriesData = await getCategories(idToken);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();

        if (id) {
            setIsEditing(true);
            const fetchAssignment = async () => {
                try {
                    const idToken = await currentUser.getIdToken();
                    const assignmentData = await getAssignmentById(currentUser.uid, id, idToken);
                    console.log('assignmentData:', assignmentData);
                    reset({
                        name: assignmentData.name,
                        description: assignmentData.description,
                        dueDate: assignmentData.dueDate,
                        category: assignmentData.category || '',
                    });
                } catch (error) {
                    console.error('Failed to fetch assignment:', error);
                }
            };
            fetchAssignment();
        }
    }, [currentUser, id, reset]);

    const handleCancel = () => {
        reset();
        navigate('/dashboard');
    };

    const onSubmit = async (data) => {
        if (!currentUser) return;
        setIsLoading(true);
        console.log('form data:', data);
        try {
            const idToken = await currentUser.getIdToken();
            if (isEditing) {
                await updateAssignment(id, data, idToken);
            } else {
                await createAssignment(data, idToken);
            }
            setAssignmentErrors([]);
            navigate('/dashboard');
        } catch (error) {
            setAssignmentErrors([error.message]);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Spinner animation="border" />;

    return (
        <Container className="mt-4">
            <h1>{isEditing ? 'Edit Assignment' : 'Add Assignment'}</h1>
            {assignmentErrors.length > 0 && (
                <Alert variant="danger">
                    {assignmentErrors.map((error, index) => <p key={index}>{error}</p>)}
                </Alert>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Assignment Name</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            placeholder="Enter the assignment's name"
                            isInvalid={!!errors.name}
                            {...register('name')}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Description</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            as="textarea"
                            placeholder="Enter the description"
                            {...register('description')}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Category</Form.Label>
                    <Col sm="10">
                        <Form.Select {...register('category')} isInvalid={!!errors.category}>
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.category?.message}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Due Date</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="date"
                            {...register('dueDate')}
                            isInvalid={!!errors.dueDate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dueDate?.message}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary" className="me-2">
                    {isEditing ? 'Update Assignment' : 'Add Assignment'}
                </Button>
                <Button type="button" variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default AssignmentPage;

