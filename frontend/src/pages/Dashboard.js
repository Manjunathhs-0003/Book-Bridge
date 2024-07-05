import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:3001/api/books');
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/books/add', { title, author, rating }, { withCredentials: true });
      setTitle('');
      setAuthor('');
      setRating(0);
      const response = await axios.get('http://localhost:3001/api/books');
      setBooks(response.data); // Update the books list
    } catch (error) {
      alert('Failed to add book');
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Dashboard</h1>
      {user && (
        <div>
          <h2>Add a Book for Trading</h2>
          <form onSubmit={handleAddBook}>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Author:</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <label>Rating:</label>
            <input type="number" max="10" min="0" value={rating} onChange={(e) => setRating(e.target.value)} required />
            <button type="submit">Add Book</button>
          </form>
        </div>
      )}
      <h2>Books Available for Trading</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Seller: {book.owner.username}</p>
            <p>Rating: {book.owner.rating}/10</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;