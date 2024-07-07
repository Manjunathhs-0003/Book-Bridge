import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { BackgroundBeams } from '../components/ui/background-beams';
import { FlipWords } from '../components/ui/flip-words';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { HoverEffect } from '../components/ui/card-hover-effect';
import { cn } from '../utils/cn';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { user: currentUser } = useContext(AuthContext);

  const [contactDetails, setContactDetails] = useState({ email: '', phone: '', address: '' });
  const [newBook, setNewBook] = useState({ title: '', author: '', rating: '', details: '' });

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

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/books/add', newBook, { withCredentials: true });
      alert('Book added successfully');
      setNewBook({ title: '', author: '', rating: '', details: '' });
      const response = await axios.get('http://localhost:3001/api/users/profile', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      setError('Error adding book');
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
      await axios.delete(
        'http://localhost:3001/api/books/delete-book',
        {
          data: { bookId },
          withCredentials: true, // Ensure you send credentials
        }
      );
      setUser(prevUser => ({
        ...prevUser,
        books: prevUser.books.filter(book => book._id !== bookId),
      }));
      alert('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error); // Log the error
      alert(`Error deleting book: ${error.response?.data?.message || error.message}`);
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
  const wordss = ['Books', 'Available'];

  const books = user.books.map(book => ({
    id: book._id, // Ensure each item has a unique identifier
    title: book.title,
    description: `Author: ${book.author}\nDetails: ${book.details}\nRating: ${book.rating}`,
    link: `#`, // Placeholder link; you can link to a detailed book page if required
  }));

  return (
    <div className="min-h-screen flex  items-center justify-center bg-black text-white">
      <BackgroundBeams className="fixed inset-0 z-0 h-full w-full" />
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

            <button type="submit" className="mt-4 p-[3px] relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Update
              </div>
            </button>
          </form>
        </div>

        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 dark:bg-black">
          <h2 className="font-bold text-xl text-white dark:text-neutral-200">Add a Book</h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-sm dark:text-neutral-300">Add a new book to your collection.</p>

          <form onSubmit={handleAddBook} className="my-8 space-y-4">
            <LabelInputContainer>
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                type="text"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                placeholder="Book Title"
                className="w-full p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                type="text"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                placeholder="Author"
                className="w-full p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                value={newBook.rating}
                onChange={(e) => setNewBook({ ...newBook, rating: e.target.value })}
                placeholder="Rating"
                className="w-full p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="details">Details about the book</Label>
              <Input
                id="details"
                type="text"
                value={newBook.details}
                onChange={(e) => setNewBook({ ...newBook, details: e.target.value })}
                placeholder="Details"
                className="w-full p-2 bg-neutral-800 shadow-input text-white border border-gray-600 rounded"
                required
              />
            </LabelInputContainer>

            <button type="submit" className="mt-4 p-[3px] relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Add Book
              </div>
            </button>
          </form>
        </div>

        <div className="mt-8 space-y-4">
          <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
            <FlipWords words={wordss} className="inline-block" />
          </div>
          {user.books.length > 0 ? (
            <HoverEffect items={books} onDeleteBook={handleBookDelete} />
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 items-start", className)}>{children}</div>;
};

export default ProfilePage;