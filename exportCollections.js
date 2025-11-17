const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = "mongodb+srv://abdulham33d:%402007Jim@bookstore.iuvbmmi.mongodb.net/bookstore";

async function exportCollections() {
  try {
    console.log('Connecting to MongoDB...');
    const client = await MongoClient.connect(uri);
    const db = client.db('bookstore');
    
    // Create exports directory
    const exportDir = path.join(__dirname, 'mongodb-exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }
    
    // Export books collection
    console.log('\n📚 Exporting books collection...');
    const books = await db.collection('books').find().toArray();
    fs.writeFileSync(
      path.join(exportDir, 'books.json'),
      JSON.stringify(books, null, 2)
    );
    console.log(`✅ Exported ${books.length} books to books.json`);
    
    // Export orders collection
    console.log('\n📦 Exporting orders collection...');
    const orders = await db.collection('orders').find().toArray();
    fs.writeFileSync(
      path.join(exportDir, 'orders.json'),
      JSON.stringify(orders, null, 2)
    );
    console.log(`✅ Exported ${orders.length} orders to orders.json`);
    
    await client.close();
    
    console.log('\n🎉 Export complete!');
    console.log(`Files saved to: ${exportDir}`);
    console.log('\nFiles created:');
    console.log('  - books.json');
    console.log('  - orders.json');
    
  } catch (error) {
    console.error('❌ Export error:', error);
  }
}

exportCollections();

