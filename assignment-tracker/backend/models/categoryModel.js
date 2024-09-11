const { createLabel } = require('../controllers/categoryTrelloController');
const { admin, db } = require('../firebaseAdmin');


const createCategory = async (userId, categoryData) => {
    try {
        const newCategoryRef = await db.collection('categories').doc();
        const category = {
            name: categoryData.name,
            userId: userId,
            createdAt: admin.firestore.serverTimestamp(),
        };

        await newCategoryRef.set(category);

        const userDoc = await db.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            throw new Error('User not found!');
        }
        const userData = userDoc.data();
        const { trelloBoardId } = userData;

        const trelloLabelData = await createLabel(categoryData.name, trelloBoardId);

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
            categories.push(doc.data());
        });
        return categories;

    } catch (error) {
        console.error('Error getting categories:', error);
    }

}

const getCategoryById = async (categoryId) => {
    try {
        const categoryDoc = await db.collection('category').doc(categoryId).get();
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


const deleteCategory = async (categoryId) => {
    try {
        const categoryRef = db.collection('labels').doc(categoryId);
        const categoryDoc = await categoryRef.get();
        if (!categoryDoc.exists) {
            throw new Error('Category not found!');
        }
        const categoryData = categoryDoc.data();
        const { trelloLabelId } = categoryData;

        await categoryRef.delete();

        const url = new URL(`https://api.trello.com/1/labels/${trelloLabelId}`);
        url.searchParams.append('key', process.env.TRELLO_API_KEY);
        url.searchParams.append('token', process.env.TRELLO_API_TOKEN);

        const response = await fetch(url, 
            { method: 'DELETE',
                 credentials: 'include',
             },  
           );

        if (!response.ok) {
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
                deleteCategory
 };