const { createLabel } = require('../controllers/categoryTrelloController');
const { admin, db } = require('../firebaseAdmin');


const createCategory = async (userId, categoryData) => {
    try {
        const newCategoryRef = db.collection('categories').doc();
       
        await newCategoryRef.set({
             name: categoryData.name,
            userId: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        const userDoc = await db.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            throw new Error('User not found!');
        }
        const userData = userDoc.data();
        const { boardId } = userData;
        

        const trelloLabelData = await createLabel(categoryData.name, boardId);


        const labelData = {
            labelId: trelloLabelData.id,
            name: trelloLabelData.name,
            color: trelloLabelData.color,
        };

        await newCategoryRef.update({
            trelloLabel: labelData,
        });

        return {categoryId: newCategoryRef.id, ...labelData};
    } catch (error) {
        console.error('Error creating category:', error);
        throw error("Failed to create category and label");
    }
}

const getCategories = async (userId) => {
    try { 
        const categoriesSnapshot = await db.collection('categories')
        .where('userId', '==', userId)
        .get();
        const categories = [];
        categoriesSnapshot.forEach(doc => {
            categories.push({id: doc.id, ...doc.data() });
        });
        return categories;

    } catch (error) {
        console.error('Error getting categories:', error);
    }

}

const getCategoryById = async (categoryId) => {
    try {
        const categoryDoc = await db.collection('categories').doc(categoryId).get();
        if (categoryDoc.exists) {
            return categoryDoc.data();
        } else {
            throw new Error('Category not found!');
        }
    } catch (error) {
        console.error('Error getting category:', error);
        throw error;
    }
}

const updateCategory = async (categoryId, categoryData) => {
    try {
     
        const categoryRef = db.collection('categories').doc(categoryId);
        const categoryDoc = await categoryRef.get();
    
        if (!categoryDoc.exists) {
            throw new Error('Category not found!');
        }

        const categoryDataInDb = categoryDoc.data();
        const labelId = categoryDataInDb.trelloLabel.labelId;
  

        await categoryRef.update(categoryData);

        const url = new URL(`https://api.trello.com/1/labels/${labelId}`);
        url.searchParams.append('key', process.env.TRELLO_API_KEY);
        url.searchParams.append('token', process.env.TRELLO_TOKEN);
        url.searchParams.append('name', categoryData.name);

        const response = await fetch(url,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        if (!response.ok) {
           const errorBody = await response.text();
           console.error('Trello API Error:', response.status, errorBody);
           console.error('Response headers:', response.headers);   
           throw new Error(`Error updating category: ${response.status} ${errorBody}`);
        }
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

const deleteCategory = async (categoryId) => {
    try {
        const categoryRef = db.collection('categories').doc(categoryId);
        const categoryDoc = await categoryRef.get();
        if (!categoryDoc.exists) {
            throw new Error('Category not found!');
        }
        const categoryData = categoryDoc.data();
        const labelId = categoryData.trelloLabel.labelId;
 

        await categoryRef.delete();

        const url = new URL(`https://api.trello.com/1/labels/${labelId}`);
        url.searchParams.append('key', process.env.TRELLO_API_KEY);
        url.searchParams.append('token', process.env.TRELLO_TOKEN);

        const response = await fetch(url, 
            { method: 'DELETE',
                 credentials: 'include',
             },  
           );

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Trello API Error:', response.status, errorBody);
            console.error('Response headers:', response.headers);
            throw new Error('Error deleting category');
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

module.exports = { createCategory,
                getCategories,
                getCategoryById, 
                updateCategory,
                deleteCategory
 };