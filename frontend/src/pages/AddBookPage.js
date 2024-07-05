import React, { useState } from 'react';
import { addBook } from '../api/bookApi';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addBook({ title, author });
      setMessage('Book added successfully');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Book already exists');
      } else {
        setMessage('Failed to add book');
      }
    }
  };

  return (
    <div>
      <h1>Add a Book</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Author:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;