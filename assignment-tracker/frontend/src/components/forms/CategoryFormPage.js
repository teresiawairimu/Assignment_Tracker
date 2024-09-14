import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Col, Row, Spinner, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { createCategory, getCategoryById, updateCategory } from '../../services/categoryService';


const schema = yup.object().shape({
    name: yup.string().required('The category is required'),
});

const CategoryFormPage = () => {
    const [categoryErrors, setCategoryErrors] = useState([]);
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    console.log('id from params:', id);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            const fetchCategory = async () => {
                try {
                    console.log('currentUser:', currentUser);
                    const idToken = await currentUser.getIdToken();
                    console.log('idToken:', idToken);
                    const categoryData = await getCategoryById(id, idToken);
                    console.log('categoryData:', categoryData);
                    reset({
                        name: categoryData.name,
                    });
                } catch (error) {
                    console.error('Failed to fetch category:', error);
                }
            };
            fetchCategory();
        }
    }, [currentUser, id, reset]);


    const handleCancel = () => {
        reset();
        navigate('/category');
    }

    
    const onSubmit = async (data) => {
        if (!currentUser) return;
        setIsLoading(true);
        try {
            const idToken = await currentUser.getIdToken();
            if (isEditing) {
                await updateCategory(id, data, idToken);
            } else {
                await createCategory(data, idToken);
            }
            setCategoryErrors([]);
            navigate('/category');
        } catch (error) {
            setCategoryErrors([error.message]);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <h1>{ isEditing ? 'Edit Category' : 'Add Category'}</h1>
                    {categoryErrors.length > 0 && (
                        <Alert variant="danger">
                            {categoryErrors.map((error, index) => <p key={index}>{error}</p>)}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Enter Category Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Category Name" 
                                    isInvalid={!!errors.name}
                                    {...register('name')}
                                />
                            </Col>
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="me-2">
                            {isEditing ? 'Update Category' : 'Add Category'}
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>          
    );
};

export default CategoryFormPage;