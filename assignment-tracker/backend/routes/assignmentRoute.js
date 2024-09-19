const { 
  addAssignment,
  retrieveAssignment,
  retrieveAssignments,
  modifyAssignment,
  removeAssignment,
  moveAssignment,
  retrieveAssignmentsByCategory
 } = require('../controllers/assignmentController');
const { verifyToken } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

/**
 * The assignment route
 * @module assignmentRoute
 * @type {Express.Router}
 */

/**
 * Create a new assignment
 * @name create a new assignment
 * @route {POST} /api/assignments/create
 * @access private
 * @middleware verifyToken
 * 
 */
router.post('/create', verifyToken, addAssignment);

/**
 * Retrieve an assignment by ID
 * @name Retrieve an assignment
 * @route {GET} /api/assignments/:assignmentId
 * @access private
 * @middleware verifyToken
 */
router.get('/:assignmentId', verifyToken, retrieveAssignment);

/**
 * Retrieve all assignments
 * @name Retrieve all assignments
 * @route {GET} /api/assignments/
 * @access private
 * @middleware verifyToken
 */
router.get('/', verifyToken, retrieveAssignments);

/**
 * Modify an assignment
 * @name Modify an assignment
 * @route {PUT} /api/assignments/:assignmentId
 * @access private
 * @middleware verifyToken
 */
router.put('/:assignmentId', verifyToken, modifyAssignment);

/**
 * Remove an assignment
 * @name Delete an assignment
 * @route {DELETE} /api/assignments/:assignmentId
 * @access private
 * @middleware verifyToken
 */
router.delete('/:assignmentId', verifyToken, removeAssignment);

/**
 * Move an assignment to a different list
 * @name Move an assignment to a different list
 * @route {PUT} /api/assignments/:assignmentId/move
 * @access private
 * @middleware verifyToken
 */
router.put('/:assignmentId/move', verifyToken, moveAssignment);

/**
 * Retrieve assignments by category
 * @name Retrieve assignments by category
 * @route {GET} /api/assignments/category/:categoryId
 * @access private
 * @middleware verifyToken
 */
router.get('/category/:categoryId', verifyToken, retrieveAssignmentsByCategory);

module.exports = router;

