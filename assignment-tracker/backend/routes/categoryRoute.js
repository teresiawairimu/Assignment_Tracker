const { addCategory,
    retrieveCategories,
    retrieveCategory, 
    removeCategory
 } = require('../controllers/categoryController');
 const { verifyToken } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/', verifyToken, addCategory);
router.get('/:categoryId', verifyToken, retrieveCategory);
router.get('/', verifyToken, retrieveCategories);
router.delete('/:categoryId', verifyToken, removeCategory);

module.exports = router;