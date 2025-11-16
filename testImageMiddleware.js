// Test script for Static File Middleware
// This script tests the image serving functionality

const baseURL = 'http://localhost:3000';

async function testImageMiddleware() {
  console.log('🧪 Testing Static File Middleware\n');
  console.log('=' .repeat(50));
  
  // Test 1: Request existing file
  console.log('\n✅ Test 1: Request EXISTING file (book1.txt)');
  try {
    const response1 = await fetch(`${baseURL}/images/book1.txt`);
    console.log(`Status: ${response1.status} ${response1.statusText}`);
    const text1 = await response1.text();
    console.log('Response:', text1.substring(0, 50) + '...');
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  // Test 2: Request non-existent file
  console.log('\n❌ Test 2: Request NON-EXISTENT file (notfound.jpg)');
  try {
    const response2 = await fetch(`${baseURL}/images/notfound.jpg`);
    console.log(`Status: ${response2.status} ${response2.statusText}`);
    const json2 = await response2.json();
    console.log('Error Response:', JSON.stringify(json2, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  // Test 3: Request another existing file
  console.log('\n✅ Test 3: Request EXISTING file (book2.txt)');
  try {
    const response3 = await fetch(`${baseURL}/images/book2.txt`);
    console.log(`Status: ${response3.status} ${response3.statusText}`);
    console.log('File served successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('\n✅ Middleware Testing Complete!');
  console.log('\nCheck the server console for logged requests.');
}

// Instructions
console.log(`
📋 INSTRUCTIONS:
1. Make sure your server is running (npm start or npm run dev)
2. Run this script: node testImageMiddleware.js
3. Check BOTH this console AND the server console for results
4. The server console will show the middleware logging each request

Note: You can also test directly in your browser:
- Success: http://localhost:3000/images/book1.txt
- Error:   http://localhost:3000/images/nonexistent.jpg

Starting tests in 2 seconds...
`);

setTimeout(() => {
  testImageMiddleware();
}, 2000);



