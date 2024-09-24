/**
 * @fileOverview userController.test.js - Tests for userController
 * Tests the controller functions for the user model
 */
const request = require('supertest');
const express = require('express');
const {
  registerUser,
  getUser,
  modifyUser,
  removeUser,
} = require('../controllers/userController');
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../models/userModel');

jest.mock('../models/userModel');

const app = express();
app.use(express.json());

/** Middleware to mock user authentication for testing
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
app.use((req, res, next) => {
  req.user = { uid: 'user'};
  next();
});

app.post('/users', registerUser);
app.get('/users/:id', getUser);
app.put('/users/:id', modifyUser);
app.delete('/users/:id', removeUser);

describe('User Controller Tests', () => {
  const mockUser = { id: 'user-123', username: 'Test User', email: 'testuser@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test the createUser function
   * Mocks the createUser function to return a mock object
   */
  it('should create a new user', async () => {
    createUser.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/users')
      .send({ username: 'Test User', email: 'testuser@example.com' });
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User registered successfully' });
    expect(createUser).toHaveBeenCalledWith('user',  'Test User', 'testuser@example.com');
  });

  /**
   * Test the getUserById function
   * Mocks the getUserById function to return a mock object
   */
  it('should get a user by ID', async () => {
    getUserById.mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/users/user-123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(getUserById).toHaveBeenCalledWith('user-123');
  });

  /**
   * Test the updateUser function
   * Mocks the updateUserById function to return a mock object
   */
  it('should update a user', async () => {
    updateUser.mockResolvedValue();
    const response = await request(app)
      .put('/users/user-123')
      .send({ username: 'Test User', email: 'testuser2@example.com'});
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User updated successfully' });
    expect(updateUser).toHaveBeenCalledWith('user-123', { username: 'Test User', email: 'testuser2@example.com'});
  });

  /**
   * Test the deleteUser function
   * Mocks the deleteUserById function to return a resolved promise
   */
  it('should delete a user', async () => {
    deleteUser.mockResolvedValue();

    const response = await request(app)
      .delete('/users/user-123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({message: 'User deleted successfully'});
    expect(deleteUser).toHaveBeenCalledWith('user-123');
  });
});