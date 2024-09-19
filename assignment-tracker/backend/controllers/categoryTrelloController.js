require('dotenv').config()

/**
 * Create a Trello label
 * @async
 * @param {string} name - The name of the label
 * @param {string} boardId - The ID of the board
 * @returns {Promise<Object>} - Resolves with the created label
 * @throws {Error} - Rejects with an error message
 */
 
const createLabel = async (name, boardId) => {
  const url = new URL(`https://api.trello.com/1/labels`);
  url.searchParams.append('name', name);
  url.searchParams.append('color', 'blue');
  url.searchParams.append('idBoard', boardId);
  url.searchParams.append('key', process.env.TRELLO_API_KEY);
  url.searchParams.append('token', process.env.TRELLO_TOKEN);

  try {
    const response = await fetch(url, {
        method: 'POST',
    });
     
    if (!response.ok) {
        throw new Error('Error creating label:', response.statusText);
    }
        const label = await response.json();
        return label;
    } catch (error) {
        console.error('Error creating label:', error)
        throw error;
    }
};

module.exports = {createLabel};