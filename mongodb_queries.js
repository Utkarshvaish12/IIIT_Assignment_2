const { Author, Book, Review } = require('./models');

// CRUD operations for Authors
const getAllAuthors = () => Author.find();
const getAuthorById = (id) => Author.findById(id);
const createAuthor = (authorData) => Author.create(authorData);
const updateAuthor = (id, authorData) => Author.findByIdAndUpdate(id, authorData, { new: true });
const deleteAuthor = (id) => Author.findByIdAndDelete(id);

// CRUD operations for Books
const getAllBooks = () => Book.find().populate('author');
const getBookById = (id) => Book.findById(id).populate('author');
const createBook = (bookData) => Book.create(bookData);
const updateBook = (id, bookData) => Book.findByIdAndUpdate(id, bookData, { new: true });
const deleteBook = (id) => Book.findByIdAndDelete(id);

// CRUD operations for Reviews
const getAllReviews = () => Review.find().populate('book');
const getReviewById = (id) => Review.findById(id).populate('book');
const createReview = (reviewData) => Review.create(reviewData);
const updateReview = (id, reviewData) => Review.findByIdAndUpdate(id, reviewData, { new: true });
const deleteReview = (id) => Review.findByIdAndDelete(id);


const mongoose = require('./mongodb');

const getBookDetails = async (bookId) => {
  const book = await Book.findById(bookId);
  return book;
};

const getBookReviews = async (bookId) => {
  const reviews = await Review.find({ bookId });
  return reviews;
};
 

// Get top-selling books
const getTopSellingBooks = async (limit) => {
    const books = await Book.aggregate([
      { $group: { _id: '$book_name', totalSold: { $sum: '$quantity' } } },
      { $sort: { totalSold: -1 } },
      { $limit: limit },
    ]);
  
    return books;
  };
  
  // Get average ratings for books
  const getAverageRatings = async () => {
    const reviews = await Review.aggregate([
      { $group: { _id: '$book', averageRating: { $avg: '$rating' } } },
    ]);
  
    return reviews;
  };

// Create index on the title field after connecting to MongoDB
const db = mongoose.connection;
db.once('open', async () => {
  // This code will be executed once the connection is open
  try {
    // Create index on the title field
    await Book.collection.createIndex({ title: 1 });
    await Book.collection.createIndex({ title: 1, author: 1 });

    console.log('Indexes created successfully.');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getBookDetails,
  getBookReviews,
  getTopSellingBooks,
  getAverageRatings,
};
