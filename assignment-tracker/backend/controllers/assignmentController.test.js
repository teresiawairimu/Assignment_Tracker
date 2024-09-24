/**
 * @fileoverview assignmentController test suite using jest and supertest
 * Tests the controller functions for the assignment model
 */
const request = require('supertest');
const express = require('express');
const {
  addAssignment,
  retrieveAssignment,
  removeAssignment,
} = require('../controllers/assignmentController');
const {
  createAssignment,
  getAssignmentById,
  deleteAssignment,
} = require('../models/assignmentModel');

jest.mock('../models/assignmentModel'); 


const app = express();
app.use(express.json());

/** Middleware to mock user authentication for testing
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
app.use((req, res, next) => {
  req.user = { uid: 'user-123' };
  next();
});


app.post('/assignments', addAssignment);
app.get('/assignments/:assignmentId', retrieveAssignment);
app.delete('/assignments/:assignmentId', removeAssignment);

describe('Assignment Controller Tests', () => {
  const mockAssignment = { id: 'assignment-123', title: 'Test Assignment' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test the createAssignment function
   * Mocks the createAssignment function to return a mock object
   * 
   */
  it('should create a new assignment', async () => {
    createAssignment.mockResolvedValue(mockAssignment);

    const response = await request(app)
      .post('/assignments')
      .send({ title: 'Test Assignment' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockAssignment);
    expect(createAssignment).toHaveBeenCalledWith('user-123', { title: 'Test Assignment' });
  });
  
  /**
   * Test the retrieveAssignment function
   * Mocks the getAssignmentById function to return a mock object
   */
  it('should retrieve a single assignment by ID', async () => {
    getAssignmentById.mockResolvedValue(mockAssignment);

    const response = await request(app)
      .get('/assignments/assignment-123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAssignment);
    expect(getAssignmentById).toHaveBeenCalledWith('user-123', 'assignment-123');
  });
  
  /**
   * Test the removeAssignment function
   * Mocks the deleteAssignment function to return a resolved promise
   */
  it('should delete an assignment', async () => {
    deleteAssignment.mockResolvedValue();

    const response = await request(app)
      .delete('/assignments/assignment-123');

    expect(response.status).toBe(204);
    expect(deleteAssignment).toHaveBeenCalledWith('user-123', 'assignment-123');
  });
  
  /**
   * Test the error handling for createAssignment function
   * Ensures a 500 status code is returned with the ciorrect error message
   */
  it('should handle errors when creating an assignment', async () => {
    createAssignment.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/assignments')
      .send({ title: 'Test Assignment' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('An error occurred while creating the assignment');
  });
});

