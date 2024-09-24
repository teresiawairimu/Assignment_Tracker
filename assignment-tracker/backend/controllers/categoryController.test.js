/**
 * @fileoverview categoryController test suite using jest and supertest
 * Tests the controller functions for the category model
 */
const request = require('supertest');
const express = require('express');
const {
  addCategory,
  retrieveCategories,
  retrieveCategory,
  removeCategory,
} = require('../controllers/categoryController');

const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
} = require('../models/categoryModel');

jest.mock('../models/categoryModel');

const app = express();
app.use(express.json());

/** Middleware to mock user authentication for testing
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
app.use((req, res, next) => {
  req.user = { uid: 'user' };
  next();
});

app.post('/categories', addCategory);
app.get('/categories', retrieveCategories);
app.get('/categories/:categoryId', retrieveCategory);
app.delete('/categories/:categoryId', removeCategory);

describe('Category Controller Tests', () => {
  const mockCategory = { id: 'category-123', name: 'Test Category' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test the createCategory function
   * Mocks the createCategory function to return a mock object
   * 
   */
  it('should create a new category', async () => {
    createCategory.mockResolvedValue(mockCategory);

    const response = await request(app)
      .post('/categories')
      .send({ name: 'Test Category' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCategory);
    expect(createCategory).toHaveBeenCalledWith('user', { name: 'Test Category' });
  });

  /**
   * Test the getCategories function
   * Mocks the getCategories function to return a mock object
   * 
   */
  it('should retrieve all categories', async () => {
    getCategories.mockResolvedValue([mockCategory]);

    const response = await request(app)
      .get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockCategory]);
    expect(getCategories).toHaveBeenCalledWith('user');
  });

  /**
   * Test the getCategoryById function
   * Mocks the getCategoryById function to return a mock object
   * 
   */
  it('should retrieve a category by ID', async () => {
    getCategoryById.mockResolvedValue(mockCategory);

    const response = await request(app)
      .get('/categories/category-123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
    expect(getCategoryById).toHaveBeenCalledWith('category-123');
  });

  /**
   * Test the deleteCategory function
   * Mocks the deleteCategory function to return a mock object
   * 
   */
  it('should delete a category by ID', async () => {
    deleteCategory.mockResolvedValue(mockCategory);

    const response = await request(app)
      .delete('/categories/category-123');

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
    expect(deleteCategory).toHaveBeenCalledWith('category-123');
  });
});