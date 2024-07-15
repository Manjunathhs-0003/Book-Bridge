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
  description: {
    type: String,
  },
  genre: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  fixedPrice: { // Add fixedPrice field
    type: Number,
    required: true,
  },
  rentalPrice: { // Add rentalPrice field
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);