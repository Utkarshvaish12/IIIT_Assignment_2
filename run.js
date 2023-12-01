const mongodbQueries = require('./mongodb_queries');

(async () => {
  try {
    // Get all authors
    const allAuthors = await mongodbQueries.getAllAuthors();
    console.log('All Authors:', allAuthors);

    // Create a new author
    const newAuthor = await mongodbQueries.createAuthor({ name: 'John Doe', bio: 'A talented writer' });
    console.log('New Author:', newAuthor);

    // Get all books
    const allBooks = await mongodbQueries.getAllBooks();
    console.log('All Books:', allBooks);

    // Create a new book
    const newBook = await mongodbQueries.createBook({ title: 'Great Book', author: newAuthor._id, genre: 'Fantasy' });
    console.log('New Book:', newBook);

  } catch (error) {
    console.error('Error:', error);
  } finally {
     mongoose.connection.close();
  }
})();
