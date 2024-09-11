require('dotenv').config();

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
  }
}

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

const createBoardAndList = async () => {
    const boardId = await createBoard('Assignment Board');

    if (boardId) {
        const toDoListId = await createList('To Do', boardId);
        const inProgressListId = await createList('In progress', boardId);
        const completedListId =await createList('Completed', boardId);
        return { boardId, toDoListId, inProgressListId, completedListId };
    }
};

module.exports = { createBoardAndList};