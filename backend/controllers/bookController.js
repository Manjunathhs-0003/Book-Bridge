const Book = require('../models/bookModel');

// Controller to get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Controller to get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'username email');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book details', error });
  }
};

// Controller to create a new book
exports.createBook = async (req, res) => {
  const { title, author } = req.body;
  try {
    // Check if the book already exists
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    const book = new Book({ ...req.body, owner: req.session.userId });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

// Controller to update book availability
exports.updateBookAvailability = async (req, res) => {
  try {
    const { bookId, availability } = req.body;
    const book = await Book.findByIdAndUpdate(bookId, { availability }, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// Controller to update contact and meetup details
exports.updateContactMeetupDetails = async (req, res) => {
  try {
    const { bookId, contactDetails, meetupDetails } = req.body;
    const book = await Book.findByIdAndUpdate(bookId, { 
      contactDetails, 
      meetupDetails 
    }, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book details', error });
  }
};