import axios from 'axios';

import api_base_url from './apiConfig';


const assignment_api_url = `${api_base_url}/api/assignments`;


/**
 * Creates a new assignment
 * @param {Object} assignmentData - The assignment data to be created
 * @param {string} idToken - The authentication token
 * @returns {Promise<Object>} The created assignment
 */
export const createAssignment = async (assignmentData, idToken) => { 
  const response = await axios.post(`${assignment_api_url}/create`, assignmentData,
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
 * Retreives an assignment by its ID
 * @param {string} userId - The user's ID 
 * @param {string} assignmentId - The assignment's ID to get the requested data
 * @param {string} idToken - The authentication token
 * @returns {Promise<Object>} The data of requested assignment
 */
export const getAssignmentById = async (userId, assignmentId, idToken) => {
  const response = await axios.get(`${assignment_api_url}/${assignmentId}`,
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
 * Retrieves all assignments
 * @param {string} userId - The user's ID
 * @param {string} idToken - The authentication token   
 * @returns {Promise<Array>} A list of assignments
 */
export const getAssignments = async (userId, idToken) => {
  const response = await axios.get(`${assignment_api_url}`,
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
 * Updates an assignment
 * @param {string} assignmentId - The assignment's ID to update
 * @param {object} assignmentData - The assignment data to be updated
 * @param {string} idToken - The authentication token 
 * @returns 
 */
export const updateAssignment = async (assignmentId, assignmentData, idToken) => {
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
}


/** 
 * Deletes an assignment
 * @param {string} userId - The user's ID
 * @param {string} assignmentId - The assignment's ID to delete
 * @param {string} idToken - The authentication token
 * returns {Promise<void>} - No return data on success
 */
 export const deleteAssignment = async (userId, assignmentId, idToken) => {
  await axios.delete(`${assignment_api_url}/${assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      withCredentials: true,
    }
  );
}

/**
 * Moves an assignment to a different status
 * @param {string} userId - The user's ID 
 * @param {string} assignmentId - The ID of the assignment to move
 * @param {string} newListStatus - The new status of the assignment 
 * @param {string} idToken - The authentication token
 * @returns {Promise<Object>} The updated assignment
 */
export const moveAssignment = async (userId, assignmentId, newListStatus, idToken) => {
  const response = await axios.put(`${assignment_api_url}/${assignmentId}/move`, { newListStatus },
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
 * Retrieves assignments by a specified category
 * @param {string} userId - The user's ID
 * @param {string} categoryId - The category's ID to get the requested data 
 * @param {string} idToken - The authentication token
 * @returns {Promise<Array>} A list of assignments
 */
export const getAssignmentsByCategory = async (userId, categoryId, idToken) => {
  const response = await axios.get(`${assignment_api_url}/category/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
}
