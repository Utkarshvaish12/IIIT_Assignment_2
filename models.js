const mongoose = require('./mongodb');

// Schema for Authors
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
});

// Schema for Books
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  genre: { type: String },
});

// Schema for Reviews
const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
});

// Create models
const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Author, Book, Review };