const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  getUser, 
  modifyUser, 
  removeUser
} = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * The user route
 * @module userRoute
 * @type {Express.Router}
 */

/**
 * Register a new user
 * @name register a new user
 * @route {POST} /api/users/register
 * @access private
 * @middleware verifyToken
 */
router.post('/register', verifyToken, registerUser);

/**
 * Retrieve a user by ID
 * @name Retrieve a user
 * @route {GET} /api/users/:id
 * @access private
 * @middleware verifyToken
 */
router.get('/:id', verifyToken, getUser);

/**
 * Update a user's data
 * @name Modify a user
 * @route {PUT} /api/users/:id
 * @access private
 * @middleware verifyToken
 */
router.put('/:id', verifyToken, modifyUser);

/**
 * Delete a user
 * @name Delete a user
 * @route {DELETE} /api/users/:id
 * @access private
 * @middleware verifyToken
 */
router.delete('/:id', verifyToken, removeUser);

module.exports = router;