const { addAssignment,
        retrieveAssignment,
        retrieveAssignments,
        modifyAssignment,
        removeAssignment,
        moveAssignment
 } = require('../controllers/assignmentController');
 const { verifyToken } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/create', verifyToken, addAssignment);
router.get('/:assignmentId', verifyToken, retrieveAssignment);
router.get('/', verifyToken, retrieveAssignments);
router.put('/:assignmentId', verifyToken, modifyAssignment);
router.delete('/:assignmentId', verifyToken, removeAssignment);
router.put('/:assignmentId/move', verifyToken, moveAssignment);

module.exports = router;

