// assignment.test.js
const { createAssignment } = require('../controllers/assignmentController');
const { createBoardAndList } = require('../controllers/assignmentTrelloController');
const { db, admin } = require('../firebaseAdmin');

// Mock Firestore and Trello API functions
jest.mock('../firebaseAdmin', () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        collection: jest.fn(() => ({
          add: jest.fn(),
          get: jest.fn(() => ({
            forEach: jest.fn(),
            docs: [{ data: jest.fn() }]
          }))
        })),
      }))
    })),
  },
  admin: {
    firestore: {
      Timestamp: {
        fromDate: jest.fn()
      },
      FieldValue: {
        serverTimestamp: jest.fn()
      }
    }
  }
}));

jest.mock('../controllers/assignmentTrelloController', () => ({
  createBoardAndList: jest.fn()
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 'mockedCardId' })
  })
);

describe('createAssignment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new assignment and save data in Firestore', async () => {
    const userId = 'testUserId';
    const assignmentData = {
      name: 'Test Assignment',
      description: 'Description of Test Assignment',
      dueDate: '2024-09-30',
      category: 'testCategory'
    };

    // Mock Firestore get call to return a user document without a boardId
    db.collection().doc().get.mockResolvedValueOnce({
      exists: false
    });

    // Mock createBoardAndList to return mocked board data
    const mockBoardData = {
      boardId: 'mockedBoardId',
      toDoListId: 'mockedToDoListId',
      inProgressListId: 'mockedInProgressListId',
      completedListId: 'mockedCompletedListId'
    };
    createBoardAndList.mockResolvedValueOnce(mockBoardData);

    // Mock Firestore set call to save board data
    db.collection().doc().set.mockResolvedValueOnce();

    // Mock Firestore add call to save assignment data
    db.collection().doc().collection().add.mockResolvedValueOnce();

    // Mock Firestore get call for the category
    db.collection().doc().get.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        trelloLabel: { labelId: 'mockedLabelId' }
      })
    });

    await expect(createAssignment(userId, assignmentData)).resolves.toBe('mockedCardId');

    // Assert that the correct Trello API call was made
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.trello.com/1/cards'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Accept': 'application/json' },
      })
    );

    // Assert that board and list data were saved
    expect(db.collection().doc().set).toHaveBeenCalledWith(
      {
        boardId: 'mockedBoardId',
        toDoListId: 'mockedToDoListId',
        inProgressListId: 'mockedInProgressListId',
        completedListId: 'mockedCompletedListId'
      },
      { merge: true }
    );

    // Assert that assignment data was saved
    expect(db.collection().doc().collection().add).toHaveBeenCalledWith(
      expect.objectContaining({
        name: assignmentData.name,
        description: assignmentData.description,
        dueDate: expect.any(Object),
        category: assignmentData.category,
        trelloCardId: 'mockedCardId',
        toDoListId: 'mockedToDoListId',
        notification: false,
        createdAt: expect.any(Function)
      })
    );
  });

  it('should throw an error if Trello API call fails', async () => {
    const userId = 'testUserId';
    const assignmentData = {
      name: 'Test Assignment',
      description: 'Description of Test Assignment',
      dueDate: '2024-09-30',
      category: 'testCategory'
    };

    // Mock Firestore get call to return a user document with a boardId
    db.collection().doc().get.mockResolvedValueOnce({
      exists: true,
      data: () => ({ boardId: 'mockedBoardId', toDoListId: 'mockedToDoListId' })
    });

    // Simulate fetch error
    global.fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'API Error'
    });

    await expect(createAssignment(userId, assignmentData)).rejects.toThrow('Error creating card');
  });
});
