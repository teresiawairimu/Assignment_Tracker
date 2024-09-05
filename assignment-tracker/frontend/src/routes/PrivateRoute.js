import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    if (!currentUser) {
        navigate('/login');
        return null;
    }

    return React.cloneElement(element, rest);
}

export default PrivateRoute;