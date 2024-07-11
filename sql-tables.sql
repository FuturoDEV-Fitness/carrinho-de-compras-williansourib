CREATE TABLE clients (
    id serial PRIMARY KEY,
    name varchar(150) NOT NULL,
    email varchar(150) UNIQUE NOT NULL,
    cpf varchar(50) UNIQUE NOT NULL,
    contact varchar(20) NOT NULL
);

CREATE TABLE categories (
    id serial PRIMARY KEY,
    name varchar(150) NOT NULL
);

INSERT INTO categories (name) VALUES 
('Electronics'),
('Books'),
('Clothing'),
('Home Appliances'),
('Furniture'),
('Toys'),
('Sports'),
('Automotive'),
('Beauty'),
('Groceries');

CREATE TYPE voltage_enum AS ENUM ('110', '220');

CREATE TABLE products (
    id serial PRIMARY KEY,
    name varchar(150) NOT NULL,
    amount varchar(150) UNIQUE DEFAULT '0',
    color varchar(50),
    voltage voltage_enum,
    description TEXT,
    category_id integer NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
    id serial PRIMARY KEY,
    client_id integer NOT NULL,
    total decimal(10,2),
    address TEXT,
    observations TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE order_items (
    id serial PRIMARY KEY,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    amount TEXT,
    price decimal(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


INSERT INTO clients (name, email, cpf, contact)
VALUES 
( 'John Doe', 'johndoe@example.com', '123.456.789-00', '1234567890'),
( 'Jane Smith', 'janesmith@example.com', '987.654.321-00', '9876543210'),
( 'Michael Johnson', 'michaeljohnson@example.com', '456.789.123-00', '4567891230');



INSERT INTO products ( name, amount, color, voltage, description, category_id)
VALUES 
('Laptop', 10, 'Silver', '220', 'High-performance laptop for professionals', 1),
( 'T-Shirt', 50, 'Red', NULL, 'Comfortable cotton t-shirt', 3),
( 'Microwave', 5, 'White', '110', 'Compact microwave oven', 4);


INSERT INTO orders ( client_id, total, address, observations)
VALUES 
( 1, 150.00, '123 Main St, Anytown, USA', 'Please deliver before 5 PM'),
(2, 75.50, '456 Elm St, Othertown, USA', 'Call before delivery');



INSERT INTO order_items ( order_id, product_id, amount, price)
VALUES 
( 1, 1, '1', 150.00),
( 2, 3, '2', 75.50);

