const { 
  createUser, 
  getUserById,
  updateUser,
  deleteUser
 } = require('../models/userModel');

/**
 * Register a new user
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.body - The user data
 * @param {Object} req.user - The user object
 * @param {string} req.user.uid - The user ID
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client
 */
 
const registerUser = async (req, res) => {
  const { username, email} = req.body;
  const { uid } = req.user;

  try {
    await createUser( uid, username, email);
    res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    console.error("Error registering user:", error.message);
    if (error.message === "Email already in use") {
      res.status(400).json({ error: "Email already in use" });
    } else {
        res.status(500).json({ error: "An error occurred while registering the user" });
    }
  }
};

/**
 * Retrieve a user by ID
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.id - The user ID
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client
 */

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error.message);
    res.status(500).json({ error: "An error occurred while getting the user" });
  }
};

/**
 * Modify a user's data
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.id - The user ID
 * @param {Object} req.body - The user data
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client
 */
 
const modifyUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await updateUser(id, data);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error){
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "An error occurred while updating the user" });
  }
};

/**
 * Delete a user
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.id - The user ID
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client
 */

const removeUser = async (req, res) => {
  const {id} = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch(error) {
    res.status(500).json({ error: "An error occurred while deleting the user" });
  }
};


module.exports = {
  registerUser,
  getUser,
  modifyUser,
  removeUser
};