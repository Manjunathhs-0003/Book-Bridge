import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../api/bookApi';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
        setFilteredBooks(booksData);
      } catch (error) {
        setError('Error fetching books');
      }
    };

    getBooks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredBooks(books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>List of Books</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`}>{book.title} by {book.author}</Link>
            </li>
          ))
        ) : (
          <li>No books available</li>
        )}
      </ul>
    </div>
  );
};

export default BooksPage;