import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCategories, deleteCategory } from '../services/categoryService';
import { Container, ListGroup, ListGroupItem, Button, Col} from 'react-bootstrap';
import { Row } from 'react-bootstrap';


const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            if (!currentUser) return;
            try {
                setIsLoading(true);
                setError(null);
                const idToken = await currentUser.getIdToken();
                const categoriesData = await getCategories(idToken);
                console.log('categoriesData:', categoriesData);
                console.log("category id", categoriesData.id);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setError('Failed to fetch categories. Please try again later');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }
    , [currentUser]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this assignment?');
        if (!confirmDelete) return;
        try {
            const idToken = await currentUser.getIdToken();
            await deleteCategory(id, idToken);
            console.log('Deleted category:', id);
            setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-3">Category Page</h1>
            <Row className="align-items-center mb-4">
                <Col xs="auto">
                <p>Click here to create a category!</p>
                </Col>
                <Col xs="auto">
                <Button 
                className="mb-5" 
                onClick={() => navigate('/category/create')}
                variant="primary"
                >
                Create
                </Button>
                </Col>
            </Row>
            
            {categories.length === 0 ? (
            <p>Create new categories. Click the create button</p>
            ) : (
            <ListGroup>
                {categories.map((category) => (
                    <ListGroupItem 
                    key={category.id}
                    className="d-flex justify-content-between align-items-center"
                    >
                    
                        <h2>{category.name}</h2>
                     

                        <Row>
                        <Col xs="auto">
                        <Button 
                        className="mb-5"
                        variant="primary" 
                        onClick={() => navigate(`/category/${category.id}/edit`)}
                        size="sm"
                        >
                        Edit
                        </Button>
                        </Col>
                        <Col xs="auto">
                        <Button
                        className="mb-5"
                        onClick={() => handleDelete(category.id)}
                        variant="primary"
                        size="sm"
                        >
                        Delete
                        </Button>
                        </Col>
                        </Row>
                    </ListGroupItem>
                ))}
            </ListGroup>
        )}
        </Container>
    );
};

export default CategoryPage;

