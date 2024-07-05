import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await axios.get(`http://localhost:3001/api/books/${id}`);
      setBook(response.data);
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Description: {book.description}</p>
      <h3>Contact Details</h3>
      <p>Email: {book.contactDetails.email}</p>
      <p>Phone: {book.contactDetails.phone}</p>
      <p>Address: {book.contactDetails.address}</p>
    </div>
  );
};

export default BookDetailsPage;