import axios from 'axios'

const API_URL = '/api/orders/'

// Get order notes
const getNotes = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + orderId + '/notes', config);

  return response.data;
};

// Create order notes
const createNote = async (noteText, orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL + orderId + '/notes', {
    text: noteText,
  }, config);

  return response.data;
};


const noteService = {
  getNotes,
  createNote
};

export default noteService;