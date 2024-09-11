const { 
    createUser, 
    getUserById,
    updateUser,
    deleteUser
 } = require('../models/userModel');


const registerUser = async (req, res) => {
    const { username, email} = req.body;
    const { uid } = req.user;

    try {
        await createUser( uid, username, email);
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        console.error("Error registering user:", error.message);
        if (error.message === "Email already in use") {
            res.status(400).json({ error: "Email already in use" });
        } else {
            res.status(500).json({ error: "An error occurred while registering the user" });
        }
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user:", error.message);
        res.status(500).json({ error: "An error occurred while getting the user" });
    }
}

const modifyUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        await updateUser(id, data);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error){
        console.error("Error updating user:", error.message);
        res.status(500).json({ error: "An error occurred while updating the user" });
    }
}

const removeUser = async (req, res) => {
    const {id} = req.params;
    try {
        await deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch(error) {
        res.status(500).json({ error: "An error occurred while deleting the user" });
    }
}


module.exports = {
    registerUser,
    getUser,
    modifyUser,
    removeUser
};