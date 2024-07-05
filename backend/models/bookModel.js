const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contactDetails: {
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  meetupDetails: {
    date: { type: Date },
    location: { type: String },
  },
  genre: { // new field
    type: String,
  },
  description: { // new field
    type: String,
  },
});

module.exports = mongoose.model('Book', bookSchema);