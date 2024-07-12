// frontend/src/pages/BookListPage.js

import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/bookApi';

const BookListPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <div>
      <h1 "yatra-one-regular">Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookListPage;
