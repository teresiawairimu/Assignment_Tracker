const {
  createAssignment,
  getAssignmentById,
  getAssignments,
  updateAssignment,
  deleteAssignment,
  moveAssignmentToList,
  getAssignmentsByCategory
 } = require('../models/assignmentModel');

/**
 * create a new assignment
 * @async
 * @param {Object} req - The request object containing the assignment and user data
 * @param {Object} req.user - The authenticated user object from the request
 * @param {string} req.user.uid - The user ID of the authenticated user
 * @param {Object} req.body - The assignment data from the request body
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client.
 */
 const addAssignment = async (req, res) => {
  const userId  = req.user.uid;
  const assignmentData = req.body;
  try {
    const assignment = await createAssignment(userId, assignmentData);     
    res.status(201).json(assignment);
  } catch (error) {
    console.error("Error creating assignment:", error.message);
    res.status(500).json({ error: "An error occurred while creating the assignment" });
  }
};

/**
 * retrieve a single assignment
 * @async
 * @param {Object} req - The request object containing the assignment ID
 * @param {Object} req.user - The authenticated user object from the request
 * @param {string} req.user.uid - The user ID of the authenticated user
 * @param {Object} req.params - The URL parameters
 * @param {string} req.params.assignmentId - The ID of the assignment to retrieve
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client.
*/
const retrieveAssignment = async (req, res) => {
  const userId = req.user.uid;
  const { assignmentId } = req.params;
  try {
    const assignment = await getAssignmentById(userId, assignmentId);
    res.status(200).json(assignment);
  } catch (error) {
    console.error("Error getting assignment:", error.message);
    res.status(500).json({ error: "An error occurred while getting the assignment" });
  }
};

/**
 * retrieve all assignments
 * @async
 * @param {Object} req - The request object containing the user data
 * @param {Object} req.user - The authenticated user object from the request
 * @param {string} req.user.uid - The user ID of the authenticated user
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client.
 */
const retrieveAssignments = async (req, res) => {
  const userId  = req.user.uid;  
  try {
    const assignments = await getAssignments(userId);
    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error getting assignments:", error.message);
    res.status(500).json({ error: "An error occurred while getting the assignments" });
  }
};

/**
 * modify an assignment
 * @async
 * @param {Object} req - The request object containing the assignment ID and updated assignment data
 * @param {Object} req.user - The authenticated user object from the request
 * @param {string} req.user.uid - The user ID of the authenticated user
 * @param {Object} req.params - The URL parameters
 * @param {string} req.params.assignmentId - The ID of the assignment to modify
 * @param {Object} req.body - The updated assignment data from the request body
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client.
*/
const modifyAssignment = async (req, res) => {
  const userId  = req.user.uid;
  const { assignmentId } = req.params;
  const assignmentData = req.body;

  try {
    const assignment = await updateAssignment(userId, assignmentId, assignmentData);
    res.status(200).json(assignment);
  } catch (error) {
    console.error("Error updating assignment:", error.message);
    res.status(500).json({ error: "An error occurred while updating the assignment" });
  }
};

/**
 * remove an assignment
 * @async
 * @param {Object} req - The request object containing the assignment ID
 * @param {Object} req.user - The authenticated user object from the request
 * @param {string} req.user.uid - The user ID of the authenticated user
 * @param {Object} req.params - The URL parameters
 * @param {string} req.params.assignmentId - The ID of the assignment to remove
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client.
 * 
 * 
*/
const removeAssignment = async (req, res) => {
  const userId  = req.user.uid;
  const { assignmentId } = req.params;

  try {
    await deleteAssignment(userId, assignmentId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting assignment:", error.message);
    res.status(500).json({ error: "An error occurred while deleting the assignment" });
  }
};

/**
 * move an assignment to a different list
 * @async
 * @param {Object} req - The request object containing the assignment ID and the new list status
 * @param {Object} req.user - The authenticated user object from the request
 * @param {string} req.user.uid - The user ID of the authenticated user
 * @param {Object} req.params - The URL parameters
 * @param {string} req.params.assignmentId - The ID of the assignment to move
 * @param {Object} req.body - The new list status from the request body
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client.
 */
const moveAssignment = async (req, res) => {
  const userId  = req.user.uid;
  const { assignmentId } = req.params;
  const { newListStatus } = req.body;

  try {
    await moveAssignmentToList(userId, assignmentId, newListStatus);
    res.status(200).end();
  } catch (error) {
    console.error("Error moving assignment:", error.message);
    res.status(500).json({ error: "An error occurred while moving the assignment" });
  }
};


/**
 * retrieve Assignments by category
 * @async
 * @param {Object} req - The request object containing the category ID
 * @param {Object} req.user - The authenticated user object from the request
 * @param {string} req.user.uid - The user ID of the authenticated user
 * @param {Object} req.params - The URL parameters
 * @param {string} req.params.categoryId - The ID of the category to retrieve assignments
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client.
 */
 
const retrieveAssignmentsByCategory = async (req, res) => {
  const userId  = req.user.uid;
  const { categoryId } = req.params;

  try {
   const assignments = await getAssignmentsByCategory(userId, categoryId);
   res.status(200).json(assignments);
  } catch (error) {
    console.error("Error getting assignments by category:", error.message);
    res.status(500).json({ error: "An error occurred while getting the assignments by category" });
  }
};

module.exports = { 
  addAssignment,
  retrieveAssignment,
  retrieveAssignments,
  modifyAssignment,
  removeAssignment,
  moveAssignment,
  retrieveAssignmentsByCategory
};