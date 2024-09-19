import axios from 'axios';
import api_base_url from './apiConfig';

const user_api_url = `${api_base_url}/api/users`;

/**
 * Creates a new user
 * @param {object} userData - The user data to be created 
 * @param {string} idToken - The authentication token
 * @returns {Promise<Object>} The created user
 */
export const registerUser = async (userData, idToken) => {
  const response = await axios.post(`${user_api_url}/register`, userData,
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
 * Retrieves a user by their ID
 * @param {string} id - The user's ID
 * @param {string} idToken - The authentication token
 * @returns {Promise<Object>} The user data
 */
export const getUserById = async (id, idToken) => {
  const response = await axios.get(`${user_api_url}/${id}`,
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
 * Updates a user's data
 * @param {string} id - The user's ID
 * @param {object} userData - The user data to be updated 
 * @param {string} idToken - The authentication token 
 * @returns 
 */
export const updateUser = async (id, userData, idToken) => {
  const response = await axios.put(`${user_api_url}/${id}`, userData,
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
 * Deletes a user
 * @param {string} id - The user's ID
 * @param {string} idToken - The authentication token 
 * @returns {Promise<void>} - No return data on success
 */
export const deleteUser = async (id, idToken) => {
  const response = await axios.delete(`${user_api_url}/${id}`,
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

