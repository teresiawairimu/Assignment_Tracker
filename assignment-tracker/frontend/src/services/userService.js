import axios from 'axios';
import api_base_url from './apiConfig';

const user_api_url = `${api_base_url}/api/users`;


const registerUser = async (userData, idToken) => {
    try {
        const response = await axios.post(`${user_api_url}/register`, userData,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id, idToken) => {
    try {
        const response = await axios.get(`${user_api_url}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        //console.log(response.data);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, userData, idToken) => {
    try {
        const response = await axios.put(`${user_api_url}/${id}`, userData,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id, idToken) => {
    try {
        const response = await axios.delete(`${user_api_url}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}

export {
    registerUser,
    getUserById,
    updateUser,
    deleteUser
};