require('dotenv').config();

/**
 * create a new Trello board
 * @async
 * @param {string} boardName - The name of the board to create
 * @returns {Promise<string>} - The ID of the created board
 * @throws {Error} - An error occurred creating the board
 */
const createBoard = async (boardName) => {
  const baseUrl = 'https://api.trello.com/1/boards/';
  const url = new URL(baseUrl);

  url.searchParams.append('name', boardName);
  url.searchParams.append('key', process.env.TRELLO_API_KEY);
  url.searchParams.append('token', process.env.TRELLO_TOKEN);

  try {
    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Error creating board:', response.statusText);
    }
    const boardData = await response.json();
    return boardData.id;
  } catch (error) {
    console.error('Error creating board', error);
    throw error;
  }
};

/**
 * Create a new list in a Trello board
 * @async
 * @param {string} listName - The name of the list to create
 * @param {string} boardId - The ID of the board to add the list
 * @returns {Promise<string>} - The ID of the created list
 * @throws {Error} - An error occurred creating the list
 */
const createList = async (listName, boardId) => {
  const baseUrl = `https://api.trello.com/1/boards/${boardId}/lists`;
  const url = new URL(baseUrl);

  url.searchParams.append('name', listName);
  url.searchParams.append('key', process.env.TRELLO_API_KEY);
  url.searchParams.append('token', process.env.TRELLO_TOKEN);

    
  try {
    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Error creating list:', response.statusText);
    }
    const listData = await response.json();
    return listData.id
  } catch (error) {
    console.error('Error creating list', error);
    throw error;
  } 
};

/**
 * Create a new Trello board and lists for To Do, In Progress, and Completed
 * @async
 * @returns {Promise<Object>} - The IDs of the created board and lists
 * @throws {Error} - An error occurred creating the board or lists
 */
const createBoardAndList = async () => {
  try {
    const boardId = await createBoard('Assignment Board');

    if (!boardId) {
      throw new Error('Error creating board');
    }

    const toDoListId = await createList('To Do', boardId);
    const inProgressListId = await createList('In progress', boardId);
    const completedListId =await createList('Completed', boardId);
    return { boardId, toDoListId, inProgressListId, completedListId };
  } catch (error) {
    console.error('Error creating board and lists', error);
    throw error;
  }
};

module.exports = {createBoardAndList};