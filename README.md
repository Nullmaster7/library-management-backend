# Library Management System - Backend

This is the backend of the Library Management System, built with Node.js, 
Express, and SQLite for the database. Sequelize is used as an ORM to manage data models, migrations, and seeding.

## Tech Stack
Node.js - JavaScript runtime for backend development.
Express.js - Web application framework for Node.js.
SQLite - Lightweight database engine.
Sequelize - Promise-based ORM for Node.js.
CORS - Middleware for handling Cross-Origin Resource Sharing.

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (>= version 14)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Nullmaster7/library-management-backend.git
   
   npm install

   create .env file in the root directory and add The base URL for the backend API : REACT_APP_API_URL=http://localhost:3001

2. **Run the Project**:
   ```bash
   npm run start 

Note : I shared ddl.sql file so that after npm install you can easily run the application and get database seeds that I provided.

## API Endpoints

Users

- GET /api/users - Get all users.
- GET /api/users/:id - Get a user by ID.

Books

- GET /api/books - Get all books.
- GET /api/books/:id - Get a book by ID.

Borrowing History

- POST /api/users/:userId/borrow/:bookId - Borrow book.
- POST /api/users/:userId/return/:bookId - Return book.
