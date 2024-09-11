const { addAssignment,
        retrieveAssignment,
        retrieveAssignments, 
        removeAssignment
 } = require('../controllers/assignmentController');
 const { verifyToken } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/', verifyToken, addAssignment);
router.get('/:assignmentId', verifyToken, retrieveAssignment);
router.get('/', verifyToken, retrieveAssignments);
router.delete('/:assignmentId', verifyToken, removeAssignment);

module.exports = router;

