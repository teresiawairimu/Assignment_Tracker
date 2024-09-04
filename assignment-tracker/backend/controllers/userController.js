const { createUser } = require('../models/userModel');

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

module.exports = {
    registerUser
};