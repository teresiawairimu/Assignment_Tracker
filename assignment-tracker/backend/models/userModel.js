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

const getUserById = async (id) => {
    try {
        const userDoc = await db.collection('users').doc(id).get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        return userDoc.data();
    } catch (error) {
        console.error("Error getting user by id:", error.message);
        throw new Error(error.message);
    }
};

const updateUser = async (id, data) => {
    try {
        const userRef = db.collection('users').doc(id);
        await userRef.update({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating user:", error.message);
        throw new Error(error.message);
    }
}

const deleteUser = async (id) => {
    try {
        const userRef = db.collection('users').doc(id);
        await userRef.delete();
    } catch (error) {
        console.error("Error deleting user:", error.message);
        throw new Error(error.message);
    }
}

module.exports = { 
    createUser, 
    getUserById,
    updateUser,
    deleteUser
 };