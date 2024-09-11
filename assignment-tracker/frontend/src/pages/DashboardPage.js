import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignments } from '../services/assignmentService';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            if (!currentUser) return;
            try {
                setIsLoading(true);
                setError(null);
                const idToken = await currentUser.getIdToken();
                const data = await getAssignments(currentUser.uid, idToken);
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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/assignment')}>Create Assignment</button>
            <button onClick={() => navigate('/category')}>Create Category</button>
            {assignments.length === 0 ? (
                <p>No assignments found. Click 'Create Assignment' to get started</p>
            ) : (
                <ul>
                    {assignments.map((assignment) => (
                        <li key={assignment.id}>{assignment.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DashboardPage;

