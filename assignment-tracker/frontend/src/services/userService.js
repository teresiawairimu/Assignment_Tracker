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
            }
        );
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}

export {
    registerUser
};