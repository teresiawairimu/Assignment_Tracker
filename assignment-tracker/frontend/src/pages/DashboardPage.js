import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignments, deleteAssignment, moveAssignment } from '../services/assignmentService';
import { useAuth } from '../contexts/AuthContext';
import DashboardNavbar from '../components/navbar/DashboardNavbar';
import { FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { Form, Button, Row, Col, Container, ListGroup } from 'react-bootstrap';



const DashboardPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [completedAssignments, setCompletedAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp._seconds) return 'No due date';
        const date = new Date(timestamp._seconds * 1000);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const fetchAssignments = async () => {
            if (!currentUser) return;
            try {
                setIsLoading(true);
                setError(null);
                const idToken = await currentUser.getIdToken();
                const data = await getAssignments(currentUser.uid, idToken);
                console.log('assignment data:', data);
                setAssignments(data);
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 404) {
                    setAssignments([]);
                } else {
                    setError('Failed to fetch assignments. Please try again later')
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchAssignments();
    }, [currentUser]);

    const handleDelete = async (assignmentId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this assignment?');
        if (!confirmDelete) return;
        try {
            const idToken = await currentUser.getIdToken();
            await deleteAssignment(currentUser.uid, assignmentId, idToken);
            setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
            setCompletedAssignments(completedAssignments.filter((assignment) => assignment.id !== assignmentId));
        
        } catch (error) {
            console.error(error);
            setError('Failed to delete assignment. Please try again later');
        }
    }

    const handleComplete = async (assignmentId, newListId) => {
        try {
            const idToken = await currentUser.getIdToken();
            await moveAssignment(currentUser.uid, assignmentId, newListId, idToken);
            const completedAssignment = assignments.find((assignment) => assignment.id === assignmentId);
            setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
            setCompletedAssignments([...completedAssignments, completedAssignment]);
        } catch (error) {
            console.error(error);
            setError('Failed to complete assignment. Please try again later');
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
       <div>
            <DashboardNavbar />
            <Container className="mt-5">
                <h1>Assignments</h1>
                <Row className="align-items-center mb-4">
                <Col xs={12} md="auto" className="mb-2 mb-md-0">
                <button 
                className="btn btn-success w-100 w-md-auto"
                onClick={() => navigate('/assignment/create')}
                >
                <FaPlus /> Create Assignment
                </button>
                </Col>
                <Col xs={12} md="auto">
                <Form className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" me-2"
                        />
                        
                        
                            <Button type="submit">Submit</Button>
                        
                
                </Form>
                </Col>
                </Row>
                {assignments.length === 0 ? (
                    <p>No assignments found. Click 'Create Assignment' to get started</p>
                ) : (
                    <ListGroup>
                        {assignments.map((assignment) => (
                            <div 
                            key={assignment.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            >
                            <span>{assignment.name}</span>
                            <span>{formatDate(assignment.dueDate)}</span>
                            <div>
                            <FaEdit
                            className="text-primary mx-2"
                            onClick={() => navigate(`/assignment/${assignment.id}/edit`)}
                            style={{ cursor: 'pointer' }}
                            />
                            <FaCheck
                            className="text-success mx-2"
                            onClick={() => handleComplete(assignment.id, 'completed')}
                            style={{ cursor: 'pointer' }}
                            />
                            <FaTrash
                            className="text-danger mx-2"
                            onClick={() => handleDelete(assignment.id)}
                            style={{ cursor: 'pointer' }}
                            />
                            

                            </div>
                            </div>
                        ))}
                    
                    </ListGroup>
                )}
                <h2 className="mt-5">Completed Assignments</h2>
                {completedAssignments.length === 0 ? (
                    <p>No completed assignments</p>
                ) : (
                    <ListGroup>
                        {completedAssignments.map((assignment) => (
                            <div 
                            key={assignment.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            >
                            <span>{assignment.name}</span>
                            <span>{formatDate(assignment.dueDate)}</span>
                            <div>
                            <FaTrash
                            className="text-danger mx-2"
                            onClick={() => handleDelete(assignment.id)}
                            style={{ cursor: 'pointer' }}
                            />
                            </div>
                            </div>
                        ))}
                    </ListGroup>
                )}

           </Container>
   </div>
    );
}

export default DashboardPage;

