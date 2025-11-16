const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://abdulham33d:%402007Jim@bookstore.iuvbmmi.mongodb.net/bookstore";

async function resetBookStock() {
  let client;
  try {
    console.log('Connecting to MongoDB...');
    client = await MongoClient.connect(uri);
    const db = client.db('bookstore');
    
    // First, get all books to verify the update
    const books = await db.collection('books').find({}).toArray();
    console.log(`Found ${books.length} books to update`);
    
    console.log('Resetting all books stock to 5...');
    const result = await db.collection('books').updateMany(
      {}, // match all documents
      { $set: { spaces: 5 } }, // set spaces to 5
      { upsert: false } // don't create new documents
    );

    console.log(`✅ Successfully reset stock for ${result.modifiedCount} books`);
    
    // Verify the update
    const updatedBooks = await db.collection('books').find({}).toArray();
    console.log('\nVerifying stock levels:');
    updatedBooks.forEach(book => {
      console.log(`${book.subject}: ${book.spaces} in stock`);
    });
    
  } catch (error) {
    console.error('Error resetting stock:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('\nDatabase connection closed');
    }
  }
}

resetBookStock();