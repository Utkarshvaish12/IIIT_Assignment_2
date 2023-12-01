							System Architecture and Database Schemas

System Architecture
The Online Bookstore System follows a microservices architecture with separate components for handling SQL and MongoDB databases. The backend is implemented using Node.js with Express.js, serving as the middleware to handle client requests. The system comprises the following major components:


Node.js Server (Express.js):
Responsible for handling incoming HTTP requests.
Routes requests to appropriate controllers for SQL and MongoDB operations.

SQL Database:
Manages transactional data related to customers, orders, and order details.
Utilizes the MySQL database.

MongoDB Database:
Stores non-transactional data such as books, authors, and reviews.
Utilizes the MongoDB NoSQL database.

Controllers:
Contain the business logic for handling SQL and MongoDB operations.
Interact with the respective databases based on the type of data.

Middleware:
Implements validation, logging, and error handling for incoming requests.
Enhances security and ensures data integrity.

Database Schemas

SQL Database Schema

Customers Table:
customer_id (Primary Key)
customer_name
email

Orders Table:
order_id (Primary Key)
customer_id (Foreign Key referencing Customers)
order_date

OrderDetails Table:
order_detail_id (Primary Key)
order_id (Foreign Key referencing Orders)
book_id (Foreign Key referencing Books)
quantity

MongoDB Database Schema
Authors Collection:
_id (Auto-generated)
name
bio

Books Collection:
_id (Auto-generated)
title
author (Reference to Authors collection)
genre

Reviews Collection:
_id (Auto-generated)
book (Reference to Books collection)
rating
comment


Setup Instructions and Dependencies

Prerequisites

Node.js:
Ensure Node.js is installed. If not, download it.

MySQL Database:
Install and set up a MySQL database server.
Create a database named OnlineBookstore.
Execute the SQL scripts in the sql-scripts folder to create tables.

MongoDB:
Install MongoDB.Start MongoDB service.

API Endpoints and Usage

SQL Routes

GET /sql/customers
Description: Retrieve all customers from the SQL database.

POST /sql/customers
Description: Insert a new customer into the SQL database.


MongoDB Routes

GET /mongodb/books
Description: Retrieve all books from the MongoDB database.

POST /mongodb/books
Description: Insert a new book into the MongoDB database.

POST /placeOrder
Description: Place a new order, storing customer details in SQL and retrieving book details and reviews from MongoDB.

