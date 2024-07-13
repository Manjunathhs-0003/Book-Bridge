// src/pages/BuyBookPage.js
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BuyBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/books/${id}`);
        console.log('Response data:', response.data); // Logging response data for debugging

        // Ensure data structure is as expected
        if (response.data && response.data._id) {
          setBook(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Buying: {book.title}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Book Details</h2>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.details}</p>
          <h2 className="text-2xl font-bold mb-4 mt-8">Contact Seller</h2>
          <p><strong>Email:</strong> {book.owner.email}</p>
          <p><strong>Username:</strong> {book.owner.username}</p>
        </div>
      </div>
    </div>
  );
};

export default BuyBookPage;