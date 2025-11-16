# 📚 Book Store - Backend API

Backend API for the Book Store application built with Express.js, Node.js, and MongoDB.

## 🚀 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Database (native driver)
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## 📋 Features

- RESTful API endpoints for books and orders
- MongoDB integration with native driver
- Search functionality across multiple fields
- Static file middleware for serving images
- Logger middleware for request tracking
- Full CRUD operations

## 🔧 Installation

```bash
# Install dependencies
npm install

# Run the server
npm start

# Or run with auto-restart (development)
npm run dev
```

## 🌐 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `PUT /api/books/:id` - Update book stock
- `GET /api/search?q=query` - Search books

### Orders
- `POST /api/orders` - Create new order

### Static Files
- `GET /images/:filename` - Get book images

## 💾 Database

Uses MongoDB Atlas with the following collections:
- **books** - Store book information (subject, location, price, spaces)
- **orders** - Store order information (name, phone, books array)

## 📝 Environment Variables

Create a `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
FRONTEND_URL=http://localhost:8080
```

## 🧪 Testing

```bash
# Check database connection
node checkDb.js

# Initialize database with sample data
node initDb.js

# Test search API
node testSearchAPI.js
```

## 📦 Project Structure

```
backend/
├── server.js           # Main application file
├── package.json        # Dependencies
├── checkDb.js         # Database check utility
├── initDb.js          # Database initialization
├── viewBooks.js       # View books utility
├── resetStock.js      # Reset stock utility
└── public/
    └── images/        # Static image files
```

## 👤 Author

Student Coursework Project - Full Stack Web Development

## 📄 License

This is a coursework project for educational purposes.

