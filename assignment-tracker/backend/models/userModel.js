const { db, admin } = require('../firebaseAdmin');

/**
 * Create a new user
 * @async
 * @param {string} uid - The user ID
 * @param {string} username - The username
 * @param {string} email - The email
 * @returns {Promise<void>} - Resolves when the user is created
 * @throws {Error} - Throws an error if there was an error creating the user
 */

const createUser = async (uid, username, email) => {
  try {
    const userData = {
      uid,
      username,
      email,
      role: 'user',
      assignmentsCreated: [],
      assignmentsCollaborating: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('users').doc(uid).set(userData);
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error('Failed to register the user');    
  }
};

/**
 * Retrieve a user by ID
 * @async
 * @param {string} id - The user ID
 * @returns {Promise<Object>} - The user object
 * @throws {Error} - Throws an error if there was an error getting the user
 */
const getUserById = async (id) => {
  try {
    const userDoc = await db.collection('users').doc(id).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
      return userDoc.data();
  } catch (error) {
    console.error("Error getting user by id:", error.message);
    throw new Error('Failed to retrieve the user');
  }
};

/**
 * Modify a user's data
 * @async
 * @param {string} id - The user ID
 * @param {Object} data - The user data
 * @returns {Promise<void>} - Resolves when the user is updated
 * @throws {Error} - Throws an error if there was an error updating the user
 */
const updateUser = async (id, data) => {
  try {
    const userRef = db.collection('users').doc(id);
    await userRef.update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error('Failed to update user');
  }
};

/**
 * Delete a user
 * @async
 * @param {string} id - The user ID
 * @returns {Promise<void>} - Resolves when the user is deleted
 * @throws {Error} - Throws an error if there was an error deleting the user
 */
const deleteUser = async (id) => {
  try {
    const userRef = db.collection('users').doc(id);
    await userRef.delete();
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw new Error('Failed to delete user');
  }
};

module.exports = {
  createUser, 
  getUserById,
  updateUser,
  deleteUser
 };