const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins in development
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Custom Static File Middleware for Lesson Images
app.use('/images', (req, res, next) => {
  const imagePath = path.join(__dirname, 'public', 'images', req.url);
  
  // Log the image request
  console.log(`📷 Image request: ${req.url}`);
  
  // Check if file exists
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Image not found - return error message
      console.log(`❌ Image not found: ${imagePath}`);
      return res.status(404).json({ 
        error: 'Image not found',
        message: `The requested image '${req.url}' does not exist`,
        path: req.url
      });
    }
    
    // Image exists - serve it
    console.log(`✅ Serving image: ${imagePath}`);
    res.sendFile(imagePath);
  });
});

// MongoDB Configuration - NEW CLUSTER with working SSL
const uri = process.env.MONGODB_URI || "mongodb+srv://abdulham33d:%402007Jim@bookstore.geykpp2.mongodb.net/bookstore?retryWrites=true&w=majority&appName=bookstore";
const client = new MongoClient(uri);

let db;

// Routes

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await db.collection('books').find().toArray();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// GET search books - Challenge Component (10% of grade)
app.get('/api/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    
    // If no search query, return all books
    if (!searchQuery || searchQuery.trim() === '') {
      const books = await db.collection('books').find().toArray();
      return res.json(books);
    }
    
    console.log(`🔍 Searching for: "${searchQuery}"`);
    
    // Search across multiple fields: subject, location, price (as string), spaces (as string)
    // Using regex for case-insensitive partial matching
    const searchRegex = new RegExp(searchQuery, 'i'); // 'i' for case-insensitive
    
    const books = await db.collection('books').find({
      $or: [
        { subject: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        { emoji: { $regex: searchRegex } },
        // Search in price and spaces by converting query to number if possible
        ...(isNaN(searchQuery) ? [] : [
          { price: parseInt(searchQuery) },
          { spaces: parseInt(searchQuery) }
        ])
      ]
    }).toArray();
    
    console.log(`✅ Found ${books.length} results`);
    res.json(books);
    
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: 'Error searching books' });
  }
});

// GET single book
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await db.collection('books').findOne({ _id: new ObjectId(req.params.id) });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' });
  }
});

// POST new order
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, books } = req.body;
    
    if (!name || !phone || !books || !Array.isArray(books)) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const order = {
      name,
      phone,
      books,
      date: new Date(),
      status: 'pending'
    };

    const result = await db.collection('orders').insertOne(order);
    
    for (const book of books) {
      await db.collection('books').updateOne(
        { _id: new ObjectId(book.id) },
        { $inc: { spaces: -1 } }
      );
    }

    res.status(201).json({ 
      message: 'Order created successfully', 
      orderId: result.insertedId 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// PUT update book stock
app.put('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { spaces } = req.body;

    if (typeof spaces !== 'number') {
      return res.status(400).json({ message: 'Invalid stock value' });
    }

    const result = await db.collection('books').updateOne(
      { _id: new ObjectId(id) },
      { $set: { spaces } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book stock updated successfully' });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book stock' });
  }
});

// Start server
async function startServer() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB');
    
    db = client.db('bookstore');
    await db.command({ ping: 1 });
    console.log('Database ping successful');
    
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
      console.log(`
Available endpoints:
GET    /api/books          - Get all books
GET    /api/search?q=      - Search books (Challenge Component)
GET    /api/books/:id      - Get single book
POST   /api/orders         - Create new order
PUT    /api/books/:id      - Update book stock
GET    /images/:filename   - Get lesson image (static file middleware)
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle server shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit();
});

startServer();