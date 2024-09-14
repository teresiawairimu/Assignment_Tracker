import axios from 'axios';

import api_base_url from './apiConfig';


const assignment_api_url = `${api_base_url}/api/assignments`;

const createAssignment = async (assignmentData, idToken) => {
    try {
        const response = await axios.post(`${assignment_api_url}/create`, assignmentData,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        console.log("create asignment response is:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getAssignmentById = async (userId, assignmentId, idToken) => {
    try {
        const response = await axios.get(`${assignment_api_url}/${assignmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getAssignments = async (userId, idToken) => {
    try {
        const response = await axios.get(`${assignment_api_url}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
                withCredentials: true,    
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

const updateAssignment = async (assignmentId, assignmentData, idToken) => {
    try {
        const response = await axios.put(`${assignment_api_url}/${assignmentId}`, assignmentData,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}


const deleteAssignment = async (userId, assignmentId, idToken) => {
    try {
        await axios.delete(`${assignment_api_url}/${assignmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
                withCredentials: true,
            }
        );
    } catch (error) {
        throw error;
    }
}

const moveAssignment = async (userId, assignmentId, newListId, idToken) => {
    try {
        const response = await axios.put(`${assignment_api_url}/${assignmentId}/move`, { newListId },
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}


export { createAssignment,
    getAssignmentById,
    getAssignments,
    updateAssignment,
    deleteAssignment,
    moveAssignment
 };