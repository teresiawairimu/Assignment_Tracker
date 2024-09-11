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

const saveAssignmentData = async (userId, assignmentData, cardId) => {
    await db.collection('users').doc(userId).collection('assignments').add({
        name: assignmentData.name,
        description: assignmentData.description,
        dueDate: assignmentData.dueDate ? admin.firestore.Timestamp.fromDate(new Date(assignmentData.dueDate)) : null,
        category: assignmentData.category ? assignmentData.category.labelId : null,
        trelloCardId: cardId,
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

    const url = new URL('https://api.trello.com/1/cards');
    url.searchParams.append('name', name);
    url.searchParams.append('desc', description);
    url.searchParams.append('idList', toDoListId);
    if (dueDate) url.searchParams.append('due', newDate(dueDate).toISOString());
    if (category && category.labelId) url.searchParams.append('idLabels', category.labelId);
    url.searchParams.append('key', process.env.TRELLO_API_KEY);
    url.searchParams.append('token', process.env.TRELLO_TOKEN);

    try {
        const response = await fetch(url, { 
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
             credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Error creating card:', response.statusText);
        }
        const cardData = await response.json();

        await saveAssignmentData(userId, assignmentData, cardData.id);
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
        if (assignmentDoc.exists) {
            return { id: assignmentDoc.id, ...assignmentDoc.data() };
        } else {
            return ("No such document!");
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

module.exports = { 
    createAssignment, 
    getAssignmentById,
    getAssignments,
    deleteAssignment};