const Book = require('../models/bookModel');
const User = require('../models/userModel');

// Controller to get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('owner', 'username email');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Controller to get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'username email contactDetails');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({
      book,
      owner: book.owner // includes 'contactDetails', 'username', and 'email'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book details', error });
  }
};

// Controller to create a new book
exports.createBook = async (req, res) => {
  const { title, author, rating, fixedPrice, details } = req.body;
  const rentalPrice = (fixedPrice / 2).toFixed(2); // Calculate rental price based on fixed price

  try {
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    const book = new Book({
      title,
      author,
      rating,
      fixedPrice,
      rentalPrice,
      details,
      owner: req.session.userId,
      contactDetails: req.body.contactDetails || {},
    });
    await book.save();

    const user = await User.findById(req.session.userId);
    user.books.push(book._id);
    await user.save();

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

// Controller to update a book owned by the logged-in user
exports.updateBook = async (req, res) => {
  const { bookId, title, author, availability } = req.body;
  try {
    const book = await Book.findOneAndUpdate({
      _id: bookId,
      owner: req.session.userId
    }, { title, author, availability }, { new: true });
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// Controller to delete a book owned by the logged-in user
exports.deleteBook = async (req, res) => {
  const { bookId } = req.body;
  try {
    const deletedBook = await Book.findOneAndDelete({
      _id: bookId,
      owner: req.session.userId,
    });

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found or not authorized to delete' });
    }

    res.status(200).json({ message: 'Book deleted successfully', bookId: deletedBook._id });
  } catch (error) {
    console.error('Error deleting book:', error); // Log detailed message
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};