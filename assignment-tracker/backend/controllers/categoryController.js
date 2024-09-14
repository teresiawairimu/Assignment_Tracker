const { createCategory, 
    getCategories,
    getCategoryById,
    updateCategory, 
    deleteCategory } = require('../models/categoryModel');

const addCategory = async (req, res) => {
    const userId  = req.user.uid;
    const categoryData = req.body;

    try {
        const category = await createCategory(userId, categoryData);
        res.status(201).json(category);
    } catch (error) {
        console.error("Error creating category:", error.message);
        res.status(500).json({ error: "An error occurred while creating the category" });
    }
}

const retrieveCategories = async (req, res) => {
    const userId  = req.user.uid;

    try {
        const categories = await getCategories(userId);
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting categories:", error.message);
        res.status(500).json({ error: "An error occurred while getting the categories" });
    }
}

const retrieveCategory = async (req, res) => {
    const { categoryId } = req.params;
    console.log('categoryId:', categoryId);

    try {
        const category = await getCategoryById(categoryId);
        res.status(200).json(category);
    } catch (error) {
        console.error("Error getting category:", error.message);
        res.status(500).json({ error: "An error occurred while getting the category" });
    }
}

const modifyCategory = async (req, res) => {
    const { categoryId } = req.params;
    const categoryData = req.body;

    console.log('categoryData:', categoryData);

    try {
        await updateCategory(categoryId, categoryData);
        res.status(204).send();
    } catch (error) {
        console.error("Error updating category:", error.message);
        res.status(500).json({ error: "An error occurred while updating the category" });
    }
}


const removeCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        await deleteCategory(categoryId);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting category:", error.message);
        res.status(500).json({ error: "An error occurred while deleting the category" });
    }
}

module.exports = { 
    addCategory,
    retrieveCategories,
    retrieveCategory,
    modifyCategory,
    removeCategory};