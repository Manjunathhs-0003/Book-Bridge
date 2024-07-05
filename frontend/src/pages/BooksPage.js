// frontend/src/pages/BooksPage.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/bookApi';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData); // Assuming fetchBooks returns an array of books
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Error fetching books');
      }
    };

    getBooks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>List of Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
