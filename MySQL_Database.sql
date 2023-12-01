CREATE DATABASE OnlineBookstore;
USE OnlineBookstore;

CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATETIME,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderDetails (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    book_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Insert sample data into Customers table
INSERT INTO Customers (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Bob Johnson', 'bob@example.com');

-- Insert sample data into Orders table
INSERT INTO Orders (customer_id, order_date) VALUES
(1, '2023-01-01 12:00:00'),
(2, '2023-01-02 14:30:00'),
(3, '2023-01-03 10:45:00');

-- Insert sample data into OrderDetails table
INSERT INTO OrderDetails (order_id, book_id, quantity, price) VALUES
(1, 101, 2, 20.99),
(1, 102, 1, 15.50),
(2, 103, 3, 10.99),
(3, 104, 1, 25.75);

