import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/bookApi';

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error in fetching bookssss:', error);
      }
    };

    getBooks();
  }, []);

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
