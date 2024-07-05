import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/profile', { withCredentials: true });
        console.log('User Profile Data:', response.data); // Log response data
        setUser(response.data);
      } catch (error) {
        console.error('API Error:', error); // Log API error
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <h2>Your Books</h2>
      <ul>
        {user.books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author} - {book.availability ? 'Available' : 'Not Available'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;