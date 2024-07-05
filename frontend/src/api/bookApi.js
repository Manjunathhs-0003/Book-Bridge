// frontend/src/api/bookApi.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    console.log('API Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (book) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const response = await axios.post(`${API_URL}/books/add`, book, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};
