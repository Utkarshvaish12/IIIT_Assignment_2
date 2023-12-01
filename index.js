const express = require('express');
const bodyParser = require('body-parser');
const { validateRequest, logRequests } = require('./middleware');
const sqlQueries = require('./sql_queries');
const mongodbQueries = require('./mongodb_queries');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(validateRequest);
app.use(logRequests);

// SQL Routes
app.get('/sql/customers', async (req, res) => {
  try {
    const customers = await sqlQueries.getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/sql/customers', async (req, res) => {
  try {
    // Basic input validation
    const newCustomer = req.body;
    if (!newCustomer || !newCustomer.name || !newCustomer.email) {
      return res.status(400).json({ error: 'Invalid customer data' });
    }

    const result = await sqlQueries.insertCustomer(newCustomer);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// MongoDB Routes
app.get('/mongodb/books', async (req, res) => {
  try {
    const books = await mongodbQueries.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/mongodb/books', async (req, res) => {
  try {
    // Basic input validation
    const newBook = req.body;
    if (!newBook || !newBook.title || !newBook.authorId) {
      return res.status(400).json({ error: 'Invalid book data' });
    }

    const result = await mongodbQueries.createBook(newBook);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New route for placing an order
app.post('/placeOrder', async (req, res) => {
  const { customerDetails, orderDetails } = req.body;

  try {
    // Basic input validation
    if (!customerDetails || !orderDetails || !orderDetails.bookId) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const { customerId, orderId } = await sqlQueries.placeOrder(customerDetails, orderDetails);

    // Retrieve book details from MongoDB
    const bookDetails = await mongodbQueries.getBookDetails(orderDetails.bookId);

    // Retrieve book reviews from MongoDB
    const bookReviews = await mongodbQueries.getBookReviews(orderDetails.bookId);

    res.json({
      customerId,
      orderId,
      bookDetails,
      bookReviews,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  // Export both the app and the server
  module.exports = { app, server };

