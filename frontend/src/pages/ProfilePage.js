import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { BackgroundBeams } from '../components/ui/background-beams';
import { FlipWords } from '../components/ui/flip-words';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '../utils/cn';

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

  const words = [user.username, 'Profile'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <BackgroundBeams />
      <div className="relative z-10 container mx-auto p-4 text-center space-y-8">
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          <FlipWords words={words} className="inline-block" />
        </div>

        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 dark:bg-black">
          <h2 className="font-bold text-xl text-white dark:text-neutral-200">Update Contact Details</h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-sm dark:text-neutral-300">Please update your contact details below.</p>

          <form onSubmit={handleContactDetailsChange} className="my-8 space-y-4">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactDetails.email}
                  onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                  required
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  value={contactDetails.phone}
                  onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                  placeholder="Phone Number"
                  className="w-full p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                  required
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={contactDetails.address}
                onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
                placeholder="Your Address"
                className="w-full p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                required
              />
            </LabelInputContainer>

            <button type="submit" className="mt-4 p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Update
              </div>
            </button>
          </form>
        </div>

        <div className="mt-8 space-y-4">
          <h2>Your Books for Trading</h2>
          <ul className="space-y-4">
            {user.books.map(book => (
              <li key={book._id} className="bg-gray-800 p-4 rounded">
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Availability: {book.availability ? 'Available' : 'Not Available'}</p>
                <div className="space-x-2">
                  <button
                    onClick={() => handleBookUpdate(book._id, { title: book.title, author: book.author, availability: !book.availability })}
                    className="mt-2 p-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    {book.availability ? 'Mark as Unavailable' : 'Mark as Available'}
                  </button>
                  <button
                    onClick={() => handleBookDelete(book._id)}
                    className="mt-2 p-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 items-start", className)}>{children}</div>;
};

export default ProfilePage;
