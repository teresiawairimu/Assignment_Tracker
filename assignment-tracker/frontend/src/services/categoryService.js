import axios from 'axios';

import api_base_url from './apiConfig';

const category_api_url = `${api_base_url}/api/categories`;


/**
 * Creates a new category
 * @param {Object} categoryData - The category data to be created
 * @param {string} idToken - The authentication token
 * @returns {Promise<Object>} The created category
 */

export const createCategory = async (categoryData, idToken) => {
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
}

/**
 * Retrieves all categories
 * @param {string} idToken - The authentication token
 * @returns {Promise<Array>} A list of categories
*/
export const getCategories = async (idToken) => {  
  const response = await axios.get(`${category_api_url}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      withCredentials: true,
    }
  );
  return response.data;  
}

/**
 * Retrieves a category by its ID
 * @param {string} categoryId - The category ID
 * @param {string} idToken - The authentication token
 * @returns {Promise<Object>} The data of requested category
*/
export const getCategoryById = async (categoryId, idToken) => {
  const response = await axios.get(`${category_api_url}/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
     },
     withCredentials: true,
   }
  );
  return response.data;   
}

/**
 * Updates a category
 * @param {string} categoryId - The category ID
 * @param {Object} categoryData - The category data to be updated
 * @param {string} idToken - The authentication token
 * @returns {Promise<Object>} The updated category
*/
export const updateCategory = async (categoryId, categoryData, idToken) => {
  const response = await axios.put(`${category_api_url}/${categoryId}`, categoryData,
   {
     headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
     },
     withCredentials: true,
    }
  );
  return response.data;
}

/**
 * Deletes a category
 * @param {string} categoryId - The category ID
 * @param {string} idToken - The authentication token
 * return {Promise<void>} - No return data on success
*/
export const deleteCategory = async (categoryId, idToken) => {
  await axios.delete(`${category_api_url}/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
    },
    withCredentials: true,
            }
  ); 
}
