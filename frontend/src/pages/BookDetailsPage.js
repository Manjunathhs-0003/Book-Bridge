import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [contactDetails, setContactDetails] = useState({ email: '', phone: '', address: '' });
  const [meetupDetails, setMeetupDetails] = useState({ date: '', location: '' });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/books/${id}`, { withCredentials: true });
        setBook(response.data);
      } catch (error) {
        setError('Error fetching book details');
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleUpdateDetails = async () => {
    try {
      await axios.put(`http://localhost:3001/api/books/contact-meetup`, {
        bookId: id,
        contactDetails,
        meetupDetails,
      }, { withCredentials: true });
      setBook({ ...book, contactDetails, meetupDetails });
    } catch (error) {
      setError('Error updating details');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Availability: {book.availability ? 'Available' : 'Not Available'}</p>
      <h2>Contact Details</h2>
      <p>Email: {book.contactDetails?.email}</p>
      <p>Phone: {book.contactDetails?.phone}</p>
      <p>Address: {book.contactDetails?.address}</p>
      <h2>Meetup Details</h2>
      <p>Date: {book.meetupDetails?.date}</p>
      <p>Location: {book.meetupDetails?.location}</p>

      <h2>Update Contact and Meetup Details</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={contactDetails.email}
          onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={contactDetails.phone}
          onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={contactDetails.address}
          onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
        />
      </div>
      <div>
        <label>Meetup Date:</label>
        <input
          type="date"
          value={meetupDetails.date}
          onChange={(e) => setMeetupDetails({ ...meetupDetails, date: e.target.value })}
        />
      </div>
      <div>
        <label>Meetup Location:</label>
        <input
          type="text"
          value={meetupDetails.location}
          onChange={(e) => setMeetupDetails({ ...meetupDetails, location: e.target.value })}
        />
      </div>
      <button onClick={handleUpdateDetails}>Update Details</button>
    </div>
  );
};

export default BookDetailsPage;