const {
  addCategory,
  retrieveCategories,
  retrieveCategory,
  modifyCategory, 
  removeCategory
} = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

/**
 * The category route
 * @module categoryRoute
 * @type {Express.Router}
 */

/**
 * Create a new category
 * @name create a new category
 * @route {POST} /api/categories/create
 * @access private
 * @middleware verifyToken
 */
router.post('/create', verifyToken, addCategory);

/**
 * Retrieve a category by ID
 * @name Retrieve a category
 * @route {GET} /api/categories/:categoryId
 * @access private
 * @middleware verifyToken
 */
router.get('/:categoryId', verifyToken, retrieveCategory);

/**
 * Retrieve all categories
 * @name Retrieve all categories
 * @route {GET} /api/categories/
 * @access private
 * @middleware verifyToken
 */
router.get('/', verifyToken, retrieveCategories);

/**
 * Modify a category
 * @name Modify a category
 * @route {PUT} /api/categories/:categoryId
 * @access private
 * @middleware verifyToken
 */
router.put('/:categoryId', verifyToken, modifyCategory);

/**
 * Remove a category
 * @name Delete a category
 * @route {DELETE} /api/categories/:categoryId
 * @access private
 * @middleware verifyToken
 */
router.delete('/:categoryId', verifyToken, removeCategory);

module.exports = router;