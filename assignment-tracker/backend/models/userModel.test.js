/**
 * @fileoverview Tests for user functions in userModel.js
 * Tests for createUser, getUserById, updateUser, and deleteUser functions.
 */

const { createUser, getUserById, updateUser, deleteUser } = require('../models/userModel');
const { db, admin } = require('../firebaseAdmin');

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

describe('User Model Functions', () => {
  let mockUserRef;
  let mockUserDoc;

  beforeEach(() => {
    jest.clearAllMocks();

    
    mockUserRef = {
      set: jest.fn().mockResolvedValue(),
      get: jest.fn().mockResolvedValue({ exists: true, data: jest.fn().mockReturnValue({ username: 'Test User', email: 'test@example.com' }) }),
      update: jest.fn().mockResolvedValue(),
      delete: jest.fn().mockResolvedValue(),
    };

    
    db.collection.mockImplementation(() => ({
      doc: jest.fn().mockReturnValue(mockUserRef),
    }));

 
    admin.firestore.FieldValue.serverTimestamp.mockReturnValue('mockTimestamp');
  });

  describe('createUser', () => {
    /**
     * Test the createUser function
     * It should create a new user successfully
     * It should throw an error if setting the user data fails
     * @returns {Promise<void>} - A Promise that resolves when the test is complete
     * @throws {Error} - Throws an error if the test fails
     */
    it('should create a new user successfully', async () => {
      const uid = 'testUserId';
      const username = 'Test User';
      const email = 'test@example.com';

      await createUser(uid, username, email);

      expect(db.collection).toHaveBeenCalledWith('users');
      expect(mockUserRef.set).toHaveBeenCalledWith({
        uid: 'testUserId',
        username: 'Test User',
        email: 'test@example.com',
        role: 'user',
        assignmentsCreated: [],
        assignmentsCollaborating: [],
        createdAt: 'mockTimestamp',
        updatedAt: 'mockTimestamp',
      });
    });

    /**
     * Test that the createUser function throws an error if setting the user data fails
     * @returns {Promise<void>} - A Promise that resolves when the test is complete
     * @throws {Error} - Throws an error if the test fails
     */
    it('should throw an error if setting the user data fails', async () => {
      mockUserRef.set.mockRejectedValue(new Error('Failed to create user'));

      await expect(createUser('testUserId', 'Test User', 'test@example.com')).rejects.toThrow('Failed to register the user');
    });
  });

  describe('getUserById', () => {
    /**
     * Test the getUserById function
     * It should retrieve a user by ID successfully
     * It should throw an error if the user does not exist
     * It should throw an error if getting the user data fails
     * @returns {Promise<void>} - A Promise that resolves when the test is complete
     * @throws {Error} - Throws an error if the test fails
     * 
     */
    it('should retrieve a user by ID successfully', async () => {
      const result = await getUserById('testUserId');

      expect(db.collection).toHaveBeenCalledWith('users');
      expect(mockUserRef.get).toHaveBeenCalled();
      expect(result).toEqual({ username: 'Test User', email: 'test@example.com' });
    });

    it('should throw an error if the user does not exist', async () => {
      mockUserRef.get.mockResolvedValue({ exists: false });

      await expect(getUserById('testUserId')).rejects.toThrow('User not found');
    });

    it('should throw an error if getting the user data fails', async () => {
      mockUserRef.get.mockRejectedValue(new Error('Failed to get user'));

      await expect(getUserById('testUserId')).rejects.toThrow('Failed to retrieve the user');
    });
  });

  describe('updateUser', () => {
    /**
     * Test the updateUser function
     * It should update a user successfully
     * It should throw an error if updating the user data fails
     * @returns {Promise<void>} - A Promise that resolves when the test is complete
     * @throws {Error} - Throws an error if the test fails
     */
    it('should update a user successfully', async () => {
      await updateUser('testUserId', { username: 'Updated User' });

      expect(db.collection).toHaveBeenCalledWith('users');
      expect(mockUserRef.update).toHaveBeenCalledWith({
        username: 'Updated User',
        updatedAt: 'mockTimestamp',
      });
    });

    it('should throw an error if updating the user data fails', async () => {
      mockUserRef.update.mockRejectedValue(new Error('Failed to update user'));

      await expect(updateUser('testUserId', { username: 'Updated User' })).rejects.toThrow('Failed to update user');
    });
  });

  describe('deleteUser', () => {
    /**
     * Test the deleteUser function
     * It should delete a user successfully
     * It should throw an error if deleting the user fails
     * @returns {Promise<void>} - A Promise that resolves when the test is complete
     * @throws {Error} - Throws an error if the test fails
     * 
     */
    it('should delete a user successfully', async () => {
      await deleteUser('testUserId');

      expect(db.collection).toHaveBeenCalledWith('users');
      expect(mockUserRef.delete).toHaveBeenCalled();
    });

    it('should throw an error if deleting the user fails', async () => {
      mockUserRef.delete.mockRejectedValue(new Error('Failed to delete user'));

      await expect(deleteUser('testUserId')).rejects.toThrow('Failed to delete user');
    });
  });
});
