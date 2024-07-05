import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (book) => {
  try {
    const response = await axios.post(`${API_URL}/books/add`, book, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};