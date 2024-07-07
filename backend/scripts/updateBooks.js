const mongoose = require('mongoose');
const Book = require('../models/bookModel');
const dotenv = require('dotenv');

dotenv.config();

const updateBooks = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const books = await Book.find({});

  for (const book of books) {
    let updated = false;
    if (book.rating === undefined) {
      book.rating = 0; // Default rating value
      updated = true;
    }
    if (book.details === undefined) {
      book.details = "No details available"; // Default details value
      updated = true;
    }
    if (updated) {
      await book.save();
    }
  }

  console.log('Books updated successfully');
  mongoose.connection.close();
};

updateBooks().catch(err => console.error(err));