const {createBoardAndList} = require('../controllers/assignmentTrelloController');
const { db, admin } = require('../firebaseAdmin');



const saveBoardIdAndListId = async (userId, boardData) => {
    await db.collection('users').doc(userId).set({ 
        boardId: boardData.boardId,
        toDoListId: boardData.toDoListId,
        inProgressListId: boardData.inProgressListId,
        completedListId: boardData.completedListId,
    }, { merge: true })
};

const saveAssignmentData = async (userId, assignmentData, cardId, listId) => {
    await db.collection('users').doc(userId).collection('assignments').add({
        name: assignmentData.name,
        description: assignmentData.description,
        dueDate: assignmentData.dueDate ? admin.firestore.Timestamp.fromDate(new Date(assignmentData.dueDate)) : null,
        category: assignmentData.category,
        trelloCardId: cardId,
        toDoListId: listId,
        notification: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp()

    })
}
const createAssignment = async (userId, assignmentData) => {
    const userDoc = await db.collection('users').doc(userId).get();
 

    let boardData;
    if (userDoc.exists && userDoc.data().boardId) {
        boardData = userDoc.data(); 
    } else {
        boardData = await createBoardAndList();
        await saveBoardIdAndListId(userId, boardData);
    }


    const { toDoListId } = boardData;
    const { name, description, dueDate, category } = assignmentData;
   

    let labelId;
    try {
        const categoryDoc = await db.collection('categories').doc(category).get();

        if (categoryDoc.exists) {
            const categoryData = categoryDoc.data(); 
            const labelId = categoryData.trelloLabel.labelId;
            console.log('labelId:', labelId);
        } else {
            console.log('No matching category found');
        }
    } catch (error) {
        console.error('Error getting category:', error);
    }
   

    const url = new URL('https://api.trello.com/1/cards');
    url.searchParams.append('name', name);
    url.searchParams.append('desc', description);
    url.searchParams.append('idList', toDoListId);
    if (dueDate) url.searchParams.append('due', new Date(dueDate).toISOString());
    if (labelId) url.searchParams.append('idLabels', labelId);
    url.searchParams.append('key', process.env.TRELLO_API_KEY);
    url.searchParams.append('token', process.env.TRELLO_TOKEN);

    try {
        const response = await fetch(url, { 
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Error creating card:', response.statusText);
        }
        const cardData = await response.json();
        
        
        await saveAssignmentData(userId, assignmentData, cardData.id, toDoListId);
        return cardData.id;
    } catch (error) {
        console.error('Error creating card', error);
        throw error;
    }
}

const getAssignmentById = async (userId, assignmentId) => {
    const assignmentRef = db.collection('users').doc(userId).collection('assignments').doc(assignmentId);
    
    try {
        const assignmentDoc = await assignmentRef.get();
        if (!assignmentDoc.exists) {
            return ("No such document!");
        }

        const assignmentData = assignmentDoc.data();
        const { category } = assignmentData;

        let categoryName = null;
        if (category && category.labelId) {
            const categoryQuery = db.collection('categories').where('trelloLabel.labelId', '==', category.labelId); 
            const categoryDoc = await categoryQuery.get();
            if (!categoryDoc.empty) {
                categoryName = categoryDoc.docs[0].data().name;
            }
        }

        return {
            id: assignmentDoc.id,
            ...assignmentData,
            category: categoryName || "",
        }
    } catch (error) {
        console.error('Error getting assignment:', error);
        throw error;
    }
}

const getAssignments = async (userId) => {
    const assignmentsRef = db.collection('users').doc(userId).collection('assignments');

    try {
        const assignmentsSnapshot = await assignmentsRef.get();
        const assignments = [];
        assignmentsSnapshot.forEach((doc) => {
            assignments.push({ id: doc.id, ...doc.data() });
        });
        return assignments;
    } catch (error) {
        console.error('Error getting assignments:', error);
    }
}

const updateAssignment = async (userId, assignmentId, assignmentData) => {
    const assignmentRef = db.collection('users').doc(userId).collection('assignments').doc(assignmentId);
    const assignmentDoc = await assignmentRef.get();

    if (!assignmentDoc.exists) {
        console.error('Assignment not found!');
        return;
    }

    const assignmentDetails = assignmentDoc.data();
    const trelloCardId = assignmentDetails.trelloCardId;

    const { name, description, dueDate, category } = assignmentData;


    let labelId;
    try {
        const categoryDoc = await db.collection('categories').doc(category).get();
         


        if (categoryDoc.exists) {
            const categoryData = categoryDoc.data(); 
            
            const labelId = categoryData.trelloLabel.labelId;
            console.log('labelId:', labelId);
        } else {
            console.log('No matching category found');
        }
    } catch (error) {
        console.error('Error getting category:', error);
    }
   
    const url = new URL(`https://api.trello.com/1/cards/${trelloCardId}`);
    url.searchParams.append('name', name);
    url.searchParams.append('desc', description);
    url.searchParams.append('due', new Date(dueDate).toISOString());
    if (labelId) url.searchParams.append('idLabels', labelId);
    url.searchParams.append('key', process.env.TRELLO_API_KEY);
    url.searchParams.append('token', process.env.TRELLO_TOKEN);
    

    try {
        const response = await fetch(url, { 
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Error updating card:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating card', error);
        throw error;
    }

    const updateData = {
        name: name,
        description: description,
        dueDate: dueDate ? admin.firestore.Timestamp.fromDate(new Date(dueDate)) : null,
    };

 ed
    if (category) {
        updateData.category = category;
    }

    await assignmentRef.update(updateData);
   
}


const deleteAssignment = async (userId, assignmentId) => {
    const assignmentRef = db.collection('users').doc(userId).collection('assignments').doc(assignmentId);
    const assignmentDoc = await assignmentRef.get();

    if (!assignmentDoc.exists) {
        console.error('Assignment not found!');
        return;
    }

    const assignmentData = assignmentDoc.data();
    const { trelloCardId } = assignmentData;

    await assignmentRef.delete();

    const url = new URL(`https://api.trello.com/1/cards/${trelloCardId}`);
    url.searchParams.append('key', process.env.TRELLO_API_KEY);
    url.searchParams.append('token', process.env.TRELLO_TOKEN);

    try {
        const response = await fetch(url, { 
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            },
             credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Error deleting card:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting card', error);
        throw error;
    }
}

const moveAssignmentToList = async (userId, assignmentId, newListStatus) => {
    userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
        console.error('User not found');
        return;
    }

    const { completedListId } = userDoc.data();
    const newListId = {
        completedListId: completedListId
    };

    const assignmentRef = db.collection('users').doc(userId).collection('assignments').doc(assignmentId);
    const assignmentDoc = await assignmentRef.get();

    if (!assignmentDoc.exists) {
        console.error('Assignment not found!');
        return;
    }

    const { trelloCardId } = assignmentDoc.data();

   
    const { listId } = newListId;
    const url = new URL(`https://api.trello.com/1/cards/${trelloCardId}`);
    url.searchParams.append('key', process.env.TRELLO_API_KEY);
    url.searchParams.append('token', process.env.TRELLO_TOKEN);
    if (listId) url.searchParams.append('idList', listId);

    try {
        const response = await fetch(url, { 
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            },
        });
        if (!response.ok) {
            console.error('Error moving card:', response.statusText);
            throw new Error('Error moving card:', response.statusText);
        }
    } catch (error) {
        console.error('Error moving card', error);
        throw error;
    }

    await assignmentRef.update({
        currentListId: newListId, 
        status: newListStatus,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
};

const getAssignmentsByCategory = async (userId, category) => {
    const assignmentsRef = db.collection('users').doc(userId).collection('assignments').where('category', '==', category);

    try {
        const assignmentsSnapshot = await assignmentsRef.get();
        const assignments = [];
        assignmentsSnapshot.forEach((doc) => {
            assignments.push({ id: doc.id, ...doc.data() });
        });
        return assignments;
    } catch (error) {
        console.error('Error getting assignments:', error);
    }
}



module.exports = { 
    createAssignment, 
    getAssignmentById,
    getAssignments,
    updateAssignment,
    deleteAssignment,
    moveAssignmentToList,
    getAssignmentsByCategory
};