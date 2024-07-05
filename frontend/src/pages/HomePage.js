import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:3001/api/books');
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Available Books for Trading</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Seller: {book.owner}</p>
            <Link to={`/books/${book._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;