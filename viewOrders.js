const { MongoClient } = require('mongodb');
require('dotenv').config();

// Use local MongoDB by default
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookstore';

async function viewOrders() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 URI:', uri);
    
    const client = await MongoClient.connect(uri);
    const db = client.db('bookstore');
    
    console.log('✅ Connected to MongoDB!\n');
    
    // Get all orders
    const orders = await db.collection('orders').find().sort({ date: -1 }).toArray();
    
    console.log('📦 ORDERS IN DATABASE');
    console.log('='.repeat(80));
    
    if (orders.length === 0) {
      console.log('📭 No orders found in the database.\n');
    } else {
      console.log(`📊 Total Orders: ${orders.length}\n`);
      
      orders.forEach((order, index) => {
        console.log(`\n📋 Order #${index + 1}`);
        console.log('-'.repeat(80));
        console.log(`🆔 Order ID: ${order._id}`);
        console.log(`👤 Customer Name: ${order.name}`);
        console.log(`📞 Phone: ${order.phone}`);
        console.log(`📅 Date: ${new Date(order.date).toLocaleString()}`);
        console.log(`📌 Status: ${order.status}`);
        console.log(`\n📚 Books Ordered:`);
        
        let totalPrice = 0;
        order.books.forEach((book, bookIndex) => {
          console.log(`   ${bookIndex + 1}. ${book.subject} - $${book.price}`);
          totalPrice += book.price;
        });
        
        console.log(`\n💰 Total Order Value: $${totalPrice}`);
        console.log('-'.repeat(80));
      });
      
      // Calculate statistics
      const totalRevenue = orders.reduce((sum, order) => {
        return sum + order.books.reduce((bookSum, book) => bookSum + book.price, 0);
      }, 0);
      
      const totalBooksOrdered = orders.reduce((sum, order) => sum + order.books.length, 0);
      
      console.log(`\n📊 STATISTICS`);
      console.log('='.repeat(80));
      console.log(`💵 Total Revenue: $${totalRevenue}`);
      console.log(`📚 Total Books Sold: ${totalBooksOrdered}`);
      console.log(`📦 Average Order Value: $${(totalRevenue / orders.length).toFixed(2)}`);
      console.log(`📊 Average Books per Order: ${(totalBooksOrdered / orders.length).toFixed(2)}`);
      console.log('='.repeat(80));
    }
    
    client.close();
  } catch (error) {
    console.error('❌ Error viewing orders:', error.message);
    process.exit(1);
  }
}

viewOrders();

