const { 
  createCategory, 
  getCategories,
  getCategoryById,
  updateCategory, 
  deleteCategory 
} = require('../models/categoryModel');

/**
 * Add a new category
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.body - The category data
 * @param {Object} req.user - The user object
 * @param {string} req.user.uid - The user ID
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Response when the response is sent to the client
 */
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
};

/**
 * Retreive all categories
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.user - The user object
 * @param {string} req.user.uid - The user ID
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Response when the response is sent to the client
 */
const retrieveCategories = async (req, res) => {
  const userId  = req.user.uid;

  try {
    const categories = await getCategories(userId);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error getting categories:", error.message);
    res.status(500).json({ error: "An error occurred while getting the categories" });
  }
};

/**
 * Retrieve a category by ID
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.categoryId - The category ID
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client
 */
const retrieveCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await getCategoryById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    console.error("Error getting category:", error.message);
    res.status(500).json({ error: "An error occurred while getting the category" });
  }
};

/**
 * Modify a category
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.categoryId - The category ID
 * @param {Object} req.body - The category data
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client
 */
 
const modifyCategory = async (req, res) => {
  const { categoryId } = req.params;
  const categoryData = req.body;

  try {
    await updateCategory(categoryId, categoryData);
    res.status(204).send();
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ error: "An error occurred while updating the category" });
  }
};

/**
 * Deletes a category
 * @async
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.categoryId - The category ID
 * @param {Object} res - The response object
 * @returns {Promise<void>} - Resolves when the response is sent to the client
 */
const removeCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    await deleteCategory(categoryId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ error: "An error occurred while deleting the category" });
  }
};

module.exports = { 
  addCategory,
  retrieveCategories,
  retrieveCategory,
  modifyCategory,
  removeCategory
};