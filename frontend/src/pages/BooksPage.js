import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/bookApi';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        setError('Error fetching books');
      }
    };

    getBooks();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>List of Books</h1>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book._id}>{book.title} by {book.author}</li>
          ))
        ) : (
          <li>No books available</li>
        )}
      </ul>
    </div>
  );
};

export default BooksPage;