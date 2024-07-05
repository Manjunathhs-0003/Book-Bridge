// backend/controllers/bookController.js

const Book = require('../models/bookModel');

// Create a new book
const createBook = async (req, res) => {
  const { title, author, description } = req.body;
  const ownerId = req.user._id; // Assuming user ID is extracted from JWT token or session
  const newBook = new Book({ title, author, description, owner: ownerId });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    console.log('Books:', books);  // Debugging log
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update book availability
const updateBookAvailability = async (req, res) => {
  const { bookId, available } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (book) {
      book.available = available;
      const updatedBook = await book.save();
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBook, getBooks, updateBookAvailability };
