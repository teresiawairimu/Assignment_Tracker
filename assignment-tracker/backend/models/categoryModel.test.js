/**
 * @fileoverview Tests for createCategory function in categoryModel.js
 * This suite tests the creation of a new category and Trello label integration.
 */

const { createCategory } = require('../models/categoryModel');
const { createLabel } = require('../controllers/categoryTrelloController');
const { admin, db } = require('../firebaseAdmin');

jest.mock('../controllers/categoryTrelloController'); 
jest.mock('../firebaseAdmin', () => ({
  db: {
    collection: jest.fn(),
  },
  admin: {
    firestore: {
      FieldValue: {
        serverTimestamp: jest.fn(),
      },
    },
  },
}));

describe('createCategory', () => {
  let mockCategoryRef;
  let mockUserDoc;

  beforeEach(() => {
    jest.clearAllMocks();

  
    mockCategoryRef = {
      set: jest.fn().mockResolvedValue(),
      update: jest.fn().mockResolvedValue(),
      id: 'newCategoryId',
    };

    mockUserDoc = {
      exists: true,
      data: jest.fn().mockReturnValue({ boardId: 'testBoardId' }),
    };

    db.collection.mockImplementation((collectionName) => {
      if (collectionName === 'categories') {
        return {
          doc: jest.fn().mockReturnValue(mockCategoryRef),
        };
      } else if (collectionName === 'users') {
        return {
          doc: jest.fn().mockReturnValue({
            get: jest.fn().mockResolvedValue(mockUserDoc),
          }),
        };
      }
    });


    admin.firestore.FieldValue.serverTimestamp.mockReturnValue('mockTimestamp');
  });

  /**
   * Test that a new category and Trello label are created successfully
   * and the category data is updated with the Trello label ID
   * @returns {Promise<void>} - A Promise that resolves when the test is complete
   * @throws {Error} - Throws an error if the test fails
   * 
   */
  it('should create a new category and Trello label successfully', async () => {
  
    const mockTrelloLabel = {
      id: 'trelloLabelId',
      name: 'Test Category',
      color: 'blue',
    };
    createLabel.mockResolvedValue(mockTrelloLabel);

   
    const userId = 'testUserId';
    const categoryData = { name: 'Test Category' };

 
    const result = await createCategory(userId, categoryData);

  
    expect(db.collection).toHaveBeenCalledWith('categories');
    expect(mockCategoryRef.set).toHaveBeenCalledWith({
      name: 'Test Category',
      userId: 'testUserId',
      createdAt: 'mockTimestamp',
    });

    expect(db.collection).toHaveBeenCalledWith('users');
    expect(mockUserDoc.data).toHaveBeenCalled();
    expect(createLabel).toHaveBeenCalledWith('Test Category', 'testBoardId');

    expect(mockCategoryRef.update).toHaveBeenCalledWith({
      trelloLabel: {
        labelId: 'trelloLabelId',
        name: 'Test Category',
        color: 'blue',
      },
    });

    expect(result).toEqual({
      categoryId: 'newCategoryId',
      labelId: 'trelloLabelId',
      name: 'Test Category',
      color: 'blue',
    });
  });

  /**
   * Test that an error is thrown if the user is not found
   * @returns {Promise<void>} - A Promise that resolves when the test is complete
   * @throws {Error} - Throws an error if the test fails
   * 
   */
  it('should throw an error if the user is not found', async () => {
  
    mockUserDoc.exists = false;

    const userId = 'testUserId';
    const categoryData = { name: 'Test Category' };

    await expect(createCategory(userId, categoryData)).rejects.toThrow('User not found!');
  });

  /**
   * Test that an error is thrown if Trello label creation fails
   * @returns {Promise<void>} - A Promise that resolves when the test is complete
   * @throws {Error} - Throws an error if the test fails
   * 
   */
  it('should throw an error if Trello label creation fails', async () => {
   
    createLabel.mockRejectedValue(new Error('Failed to create Trello label'));

    const userId = 'testUserId';
    const categoryData = { name: 'Test Category' };

    await expect(createCategory(userId, categoryData)).rejects.toThrow(
      'Failed to create Trello label'
    );
  });

  /**
   * Test that an error is thrown if setting the category data fails
   * @returns {Promise<void>} - A Promise that resolves when the test is complete
   * @throws {Error} - Throws an error if the test fails
   * 
   */
  it('should throw an error if setting the category data fails', async () => {
  
    mockCategoryRef.set.mockRejectedValue(new Error('Failed to set category'));

    const userId = 'testUserId';
    const categoryData = { name: 'Test Category' };

    await expect(createCategory(userId, categoryData)).rejects.toThrow(
      'Failed to set category'
    );
  });
});
