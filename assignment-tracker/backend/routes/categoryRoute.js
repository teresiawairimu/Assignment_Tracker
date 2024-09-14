const { addCategory,
    retrieveCategories,
    retrieveCategory,
    modifyCategory, 
    removeCategory
 } = require('../controllers/categoryController');
 const { verifyToken } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/create', verifyToken, addCategory);
router.get('/:categoryId', verifyToken, retrieveCategory);
router.get('/', verifyToken, retrieveCategories);
router.put('/:categoryId', verifyToken, modifyCategory);
router.delete('/:categoryId', verifyToken, removeCategory);

module.exports = router;