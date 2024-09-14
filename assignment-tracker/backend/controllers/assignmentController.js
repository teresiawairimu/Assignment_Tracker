const { createAssignment,
     getAssignmentById,
    getAssignments,
    updateAssignment,
    deleteAssignment,
    moveAssignmentToList
 } = require('../models/assignmentModel');

const addAssignment = async (req, res) => {
    const userId  = req.user.uid;
    const assignmentData = req.body;

    try {
        const assignment = await createAssignment(userId, assignmentData);     
        res.status(201).json(assignment);
    } catch (error) {
        console.error("Error creating assignment:", error.message);
        res.status(500).json({ error: "An error occurred while creating the assignment" });
    }
}

const retrieveAssignment = async (req, res) => {
    const userId = req.user.uid;
    const { assignmentId } = req.params;
    

    try {
        const assignment = await getAssignmentById(userId, assignmentId);
        res.status(200).json(assignment);
    } catch (error) {
        console.error("Error getting assignment:", error.message);
        res.status(500).json({ error: "An error occurred while getting the assignment" });
    }
}

const retrieveAssignments = async (req, res) => {
    const userId  = req.user.uid;
    

    try {
        const assignments = await getAssignments(userId);
        res.status(200).json(assignments);
    } catch (error) {
        console.error("Error getting assignments:", error.message);
        res.status(500).json({ error: "An error occurred while getting the assignments" });
    }
}

const modifyAssignment = async (req, res) => {
    const userId  = req.user.uid;
    const { assignmentId } = req.params;
    const assignmentData = req.body;

    try {
        const assignment = await updateAssignment(userId, assignmentId, assignmentData);
        res.status(200).json(assignment);
    } catch (error) {
        console.error("Error updating assignment:", error.message);
        res.status(500).json({ error: "An error occurred while updating the assignment" });
    }
}

const removeAssignment = async (req, res) => {
    const userId  = req.user.uid;
    const { assignmentId } = req.params;

    try {
        await deleteAssignment(userId, assignmentId);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting assignment:", error.message);
        res.status(500).json({ error: "An error occurred while deleting the assignment" });
    }
}

const moveAssignment = async (req, res) => {
    const userId  = req.user.uid;
    const { assignmentId } = req.params;
    const { newListId } = req.body;

    try {
        await moveAssignmentToList(userId, assignmentId, newListId);
        res.status(200).end();
    } catch (error) {
        console.error("Error moving assignment:", error.message);
        res.status(500).json({ error: "An error occurred while moving the assignment" });
    }
}

module.exports = { 
    addAssignment,
    retrieveAssignment,
    retrieveAssignments,
    modifyAssignment,
    removeAssignment,
    moveAssignment};