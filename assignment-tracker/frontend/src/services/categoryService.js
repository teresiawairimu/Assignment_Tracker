import axios from 'axios';

import api_base_url from './apiConfig';

const category_api_url = `${api_base_url}/api/categories`;

const createCategory = async (categoryData, idToken) => {
    try {
        const response = await axios.post(`${category_api_url}/create`, categoryData,
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

const getCategories = async (idToken) => {
    try {
        const response = await axios.get(`${category_api_url}`,
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

const getCategoryById = async (categoryId, idToken) => {
    try {
        const response = await axios.get(`${category_api_url}/${categoryId}`,
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



const deleteCategory = async (categoryId, idToken) => {
    try {
        await axios.delete(`${category_api_url}/${categoryId}`,
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

export { createCategory,
    getCategories,
    getCategoryById, 
    deleteCategory
 };