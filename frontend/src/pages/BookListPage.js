import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookListPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get('/api/books');
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Available Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookListPage;
