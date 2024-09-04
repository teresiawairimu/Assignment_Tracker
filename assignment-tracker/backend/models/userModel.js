const { db, admin } = require('../firebaseAdmin');

const createUser = async (uid, username, email) => {
    try {
        const userData = {
            uid,
            username,
            email,
            role: 'user',
            assignmentsCreated: [],
            assignmentsCollaborating: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };
        await db.collection('users').doc(uid).set(userData);

    } catch (error) {
        console.error("Error registering user:", error.message);
       throw new Error(error.message);
        
    }
};

module.exports = { createUser };