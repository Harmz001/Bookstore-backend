const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://abdulham33d:%402007Jim@bookstore.iuvbmmi.mongodb.net/?retryWrites=true&w=majority';

async function viewBooks() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('bookstore');
    
    console.log('\n📚 All Books in Database:\n');
    const books = await db.collection('books').find().toArray();
    
    books.forEach(book => {
      console.log(`${book.emoji} ${book.subject}`);
      console.log(`   Genre: ${book.location}`);
      console.log(`   Price: $${book.price}`);
      console.log(`   In Stock: ${book.spaces}`);
      console.log('------------------------');
    });

    console.log(`\nTotal Books: ${books.length}`);
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

viewBooks();
