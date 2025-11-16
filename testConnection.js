// Quick diagnostic test for search feature
const fetch = require('node-fetch');

const baseURL = 'http://localhost:3000';

async function testConnection() {
  console.log('🔍 TESTING SEARCH FEATURE\n');
  console.log('=' .repeat(60));
  
  try {
    // Test 1: Check if server is running
    console.log('\n📡 Test 1: Checking if server is running...');
    const healthCheck = await fetch(baseURL);
    console.log(`✅ Server is running on ${baseURL}`);
  } catch (error) {
    console.error(`❌ ERROR: Server is NOT running!`);
    console.error(`   Make sure to run: cd backend && npm start`);
    console.error(`   Error: ${error.message}\n`);
    return;
  }
  
  try {
    // Test 2: Check /api/books endpoint
    console.log('\n📚 Test 2: Checking /api/books endpoint...');
    const booksResponse = await fetch(`${baseURL}/api/books`);
    const books = await booksResponse.json();
    console.log(`✅ Found ${books.length} books in database`);
    if (books.length > 0) {
      console.log(`   Sample: ${books[0].subject} (${books[0].location})`);
    }
  } catch (error) {
    console.error(`❌ ERROR fetching books: ${error.message}`);
  }
  
  try {
    // Test 3: Check /api/search endpoint
    console.log('\n🔍 Test 3: Testing /api/search endpoint...');
    const searchResponse = await fetch(`${baseURL}/api/search?q=fiction`);
    
    if (!searchResponse.ok) {
      console.error(`❌ Search endpoint returned: ${searchResponse.status} ${searchResponse.statusText}`);
      return;
    }
    
    const searchResults = await searchResponse.json();
    console.log(`✅ Search endpoint working! Found ${searchResults.length} results for "fiction"`);
    
    if (searchResults.length > 0) {
      console.log('   Results:');
      searchResults.forEach((book, i) => {
        console.log(`   ${i + 1}. ${book.subject} (${book.location})`);
      });
    }
  } catch (error) {
    console.error(`❌ ERROR testing search: ${error.message}`);
  }
  
  try {
    // Test 4: Check empty search
    console.log('\n📋 Test 4: Testing empty search...');
    const emptySearch = await fetch(`${baseURL}/api/search?q=`);
    const emptyResults = await emptySearch.json();
    console.log(`✅ Empty search returns ${emptyResults.length} books (should return all)`);
  } catch (error) {
    console.error(`❌ ERROR with empty search: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📋 DIAGNOSIS COMPLETE!\n');
  console.log('If all tests passed, the backend search is working.');
  console.log('If you see errors above, follow the suggestions.\n');
}

testConnection();


