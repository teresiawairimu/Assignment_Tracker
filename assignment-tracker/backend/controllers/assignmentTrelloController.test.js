/**
 * @fileoverview assignmentTrelloController test suite using jest
 */
const { createBoardAndList } = require('./assignmentTrelloController'); // Replace with the correct path
const fetch = require('node-fetch');


jest.mock('node-fetch', () => jest.fn());


describe('createBoardAndList', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  /**
   * Test the createBoardAndList function
   * Mocks the fetch function to return a mock response
   * 
   */
  it('should create a board and lists successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'mockBoardId' }),
    });

  
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'mockToDoListId' }),
    });
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'mockInProgressListId' }),
    });
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'mockCompletedListId' }),
    });

    const result = await createBoardAndList();

   
    expect(result).toEqual({
      boardId: 'mockBoardId',
      toDoListId: 'mockToDoListId',
      inProgressListId: 'mockInProgressListId',
      completedListId: 'mockCompletedListId',
    });
    expect(fetch).toHaveBeenCalledTimes(4); // One call for board creation, three for lists
  });

  /**
   * Test the createBoardAndList function
   * Mocks the fetch function to return a mock response
   */
  it('should throw an error if board creation fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Bad Request',
    });

    await expect(createBoardAndList()).rejects.toThrow('Error creating board: Bad Request');
    expect(fetch).toHaveBeenCalledTimes(1); // Only the board creation is attempted
  });

  /**
   * Test the createBoardAndList function
   * Mocks the fetch function to return a mock response
   */
  it('should throw an error if list creation fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'mockBoardId' }),
    });

   
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Bad Request',
    });

    await expect(createBoardAndList()).rejects.toThrow('Error creating list: Bad Request');
    expect(fetch).toHaveBeenCalledTimes(2); // One call for board, one for list
  });
});



