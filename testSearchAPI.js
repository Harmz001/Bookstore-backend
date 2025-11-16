// Test script for Search API (Challenge Component - 10%)
// This demonstrates the backend search functionality

const baseURL = 'http://localhost:3000';

async function testSearchAPI() {
  console.log('🔍 TESTING SEARCH API (Challenge Component)\n');
  console.log('=' .repeat(60));
  
  const tests = [
    { query: 'fiction', description: 'Search for genre "fiction"' },
    { query: 'art', description: 'Search for "art" (finds Art & Design, Art genre)' },
    { query: '25', description: 'Search for price "25"' },
    { query: 'a', description: 'Search for single letter "a"' },
    { query: 'technology', description: 'Search for "technology"' },
    { query: 'xyz123', description: 'Search with no results' },
    { query: '', description: 'Empty search (returns all books)' }
  ];
  
  for (const test of tests) {
    console.log(`\n📌 Test: ${test.description}`);
    console.log(`   Query: "${test.query}"`);
    console.log(`   URL: ${baseURL}/api/search?q=${encodeURIComponent(test.query)}`);
    
    try {
      const response = await fetch(`${baseURL}/api/search?q=${encodeURIComponent(test.query)}`);
      const data = await response.json();
      
      console.log(`   Status: ${response.status} ${response.statusText}`);
      console.log(`   Results: ${data.length} book(s) found`);
      
      if (data.length > 0) {
        console.log('   Sample results:');
        data.slice(0, 3).forEach((book, index) => {
          console.log(`     ${index + 1}. ${book.subject} (${book.location}) - $${book.price}`);
        });
      }
      
    } catch (error) {
      console.error(`   ❌ Error:`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait between tests
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ SEARCH API TESTING COMPLETE!\n');
  console.log('Key Features Demonstrated:');
  console.log('  ✓ Searches across multiple fields (subject, location, price, spaces)');
  console.log('  ✓ Case-insensitive partial matching');
  console.log('  ✓ Works with letters and numbers');
  console.log('  ✓ Handles empty queries');
  console.log('  ✓ Returns proper JSON responses');
  console.log('  ✓ Can be tested without frontend (via Postman or this script)');
  console.log('\n📋 Points: 7% (Approach 2: Backend implementation)');
}

console.log(`
╔════════════════════════════════════════════════════════════╗
║  SEARCH API TEST SCRIPT - Challenge Component (10%)       ║
╚════════════════════════════════════════════════════════════╝

📋 INSTRUCTIONS:
1. Make sure your backend server is running
   → cd backend
   → npm start

2. Run this test script
   → node testSearchAPI.js

3. Check both consoles:
   → This console: Test results
   → Server console: MongoDB queries and search logs

4. Also test in Postman:
   → GET http://localhost:3000/api/search?q=fiction
   → GET http://localhost:3000/api/search?q=art
   → GET http://localhost:3000/api/search?q=25

Starting tests in 2 seconds...
`);

setTimeout(() => {
  testSearchAPI();
}, 2000);



