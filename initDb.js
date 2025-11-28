const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://abdulham33d:%402007Jim@bookstore.geykpp2.mongodb.net/?appName=bookstore'

const sampleBooks = [
  {
    subject: 'The Great Gatsby',
    location: 'Fiction',
    price: 25,
    spaces: 5,
    emoji: '📚'
  },
  {
    subject: 'To Kill a Mockingbird',
    location: 'Fiction',
    price: 30,
    spaces: 5,
    emoji: '📖'
  },
  {
    subject: 'The Art of Programming',
    location: 'Technology',
    price: 45,
    spaces: 5,
    emoji: '💻'
  },
  {
    subject: 'Cooking Basics',
    location: 'Lifestyle',
    price: 35,
    spaces: 5,
    emoji: '📖'
  },
  {
    subject: 'World History',
    location: 'Education',
    price: 40,
    spaces: 5,
    emoji: '📚'
  },
  {
    subject: 'Poetry Collection',
    location: 'Poetry',
    price: 20,
    spaces: 5,
    emoji: '📝'
  },
  {
    subject: 'Science Encyclopedia',
    location: 'Education',
    price: 50,
    spaces: 5,
    emoji: '📚'
  },
  {
    subject: 'Mystery Tales',
    location: 'Fiction',
    price: 28,
    spaces: 5,
    emoji: '📖'
  },
  {
    subject: 'Art & Design',
    location: 'Art',
    price: 38,
    spaces: 5,
    emoji: '🎨'
  },
  {
    subject: 'Business Strategy',
    location: 'Business',
    price: 42,
    spaces: 5,
    emoji: '📊'
  }
];

async function initializeDatabase() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('bookstore');
    
    // Drop existing collections
    await db.collection('books').drop().catch(() => {});
    await db.collection('orders').drop().catch(() => {});
    
    // Create collections
    await db.createCollection('books');
    await db.createCollection('orders');
    
    // Insert sample books
    await db.collection('books').insertMany(sampleBooks);
    
    console.log('Database initialized successfully');
    client.close();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
