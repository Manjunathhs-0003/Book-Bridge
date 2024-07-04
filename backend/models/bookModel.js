const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    available: { type: Boolean, default: true }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
