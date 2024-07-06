import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { BackgroundBeams } from '../components/ui/background-beams';  // Ensure this import path is correct
import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { user: currentUser } = useContext(AuthContext);

  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/profile', { withCredentials: true });
        setUser(response.data);
        setContactDetails(response.data.contactDetails || {});
      } catch (error) {
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleContactDetailsChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3001/api/users/contact-details', contactDetails, { withCredentials: true });
      setUser(response.data);
      alert('Contact details updated successfully');
    } catch (error) {
      setError('Error updating contact details');
    }
  };

  const handleBookUpdate = async (bookId, updatedData) => {
    try {
      const response = await axios.put('http://localhost:3001/api/books/update-book', { bookId, ...updatedData }, { withCredentials: true });
      setUser(prevUser => ({
        ...prevUser,
        books: prevUser.books.map(book => book._id === bookId ? response.data : book)
      }));
      alert('Book updated successfully');
    } catch (error) {
      setError('Error updating book');
    }
  };

  const handleBookDelete = async (bookId) => {
    try {
      await axios.delete('http://localhost:3001/api/books/delete-book', { data: { bookId } }, { withCredentials: true });
      setUser(prevUser => ({
        ...prevUser,
        books: prevUser.books.filter(book => book._id !== bookId)
      }));
      alert('Book deleted successfully');
    } catch (error) {
      setError('Error deleting book');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />
      <BackgroundBeams />
      <div className="container mx-auto p-4 text-center">
        <h1>{user.username}'s Profile</h1>
        <p>Email: {user.email}</p>
        
        <h2>Update Contact Details</h2>
        <form onSubmit={handleContactDetailsChange}>
          <label>Email:</label>
          <input type="email" value={contactDetails.email} onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })} required />
          <label>Phone:</label>
          <input type="text" value={contactDetails.phone} onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })} required />
          <label>Address:</label>
          <input type="text" value={contactDetails.address} onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })} required />
          <button type="submit">Update Contact Details</button>
        </form>

        <h2>Your Books for Trading</h2>
        <ul>
          {user.books.map(book => (
            <li key={book._id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Availability: {book.availability ? 'Available' : 'Not Available'}</p>
              <button onClick={() => handleBookUpdate(book._id, { title: book.title, author: book.author, availability: !book.availability })}>
                {book.availability ? 'Mark as Unavailable' : 'Mark as Available'}
              </button>
              <button onClick={() => handleBookDelete(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;