const express = require('express');
const router = express.Router();
const { registerUser, getUser, modifyUser, removeUser } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', verifyToken, registerUser);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, modifyUser);
router.delete('/:id', verifyToken, removeUser);

module.exports = router;