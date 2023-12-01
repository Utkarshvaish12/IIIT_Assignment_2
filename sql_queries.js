const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0940139',
  database: 'OnlineBookstore',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Export the connection for use in other modules
module.exports = connection;

// SELECT all customers
const getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    sqlConnection.query('SELECT * FROM Customers', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// INSERT a new customer
const insertCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    sqlConnection.query('INSERT INTO Customers SET ?', customer, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// UPDATE customer details
const updateCustomer = (customerId, newDetails) => {
  return new Promise((resolve, reject) => {
    sqlConnection.query('UPDATE Customers SET ? WHERE customer_id = ?', [newDetails, customerId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// DELETE a customer
const deleteCustomer = (customerId) => {
  return new Promise((resolve, reject) => {
    sqlConnection.query('DELETE FROM Customers WHERE customer_id = ?', customerId, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// SELECT orders with customer details
const getOrdersWithCustomers = () => {
    return new Promise((resolve, reject) => {
      sqlConnection.query('SELECT Orders.*, Customers.customer_name FROM Orders JOIN Customers ON Orders.customer_id = Customers.customer_id', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };
  
  // SELECT order details with book information
  const getOrderDetailsWithBooks = () => {
    return new Promise((resolve, reject) => {
      sqlConnection.query('SELECT OrderDetails.*, Books.book_name, Books.author FROM OrderDetails JOIN Books ON OrderDetails.book_id = Books.book_id', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };
 
// Generate sales report by book
const getBookSalesReport = () => {
    return new Promise((resolve, reject) => {
      sqlConnection.query('SELECT Books.book_name, SUM(OrderDetails.quantity) AS total_sold FROM OrderDetails JOIN Books ON OrderDetails.book_id = Books.book_id GROUP BY Books.book_name HAVING total_sold > 10', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };
  
  
  const placeOrder = async (customerDetails, orderDetails) => {
    try {
      await sqlConnection.beginTransaction();
  
      // Insert customer details into the Customers table
      const resultCustomer = await sqlConnection.query('INSERT INTO Customers SET ?', customerDetails);
      const customerId = resultCustomer.insertId;
  
      // Insert order details into the Orders table
      const resultOrder = await sqlConnection.query('INSERT INTO Orders SET ?', {
        customer_id: customerId,
        order_date: new Date(),
        ...orderDetails,
      });
      const orderId = resultOrder.insertId;
  
      // Commit the transaction
      await sqlConnection.commit();
  
      return { customerId, orderId };
    } catch (error) {
      // Rollback the transaction in case of an error
      await sqlConnection.rollback();
      throw error;
    }
  };
  module.exports = {
    getAllCustomers,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    placeOrder,
  };
