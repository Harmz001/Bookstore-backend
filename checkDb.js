const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://abdulham33d:%402007Jim@bookstore.iuvbmmi.mongodb.net/?retryWrites=true&w=majority';

async function checkDatabase() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const client = await MongoClient.connect(uri);
    console.log('✅ Successfully connected to MongoDB');

    const db = client.db('bookstore');
    
    // Check books collection
    const books = await db.collection('books').find().toArray();
    console.log('\n📚 Books in database:', books.length);
    console.log('\nSample of books:');
    books.slice(0, 3).forEach(book => {
      console.log(`- ${book.subject} (${book.location}) - $${book.price}`);
    });

    await client.close();
    console.log('\n🔌 Connection closed');
  } catch (error) {
    console.error('❌ Database Error:', error);
  }
}

checkDatabase();
