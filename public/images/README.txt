LESSON IMAGES FOLDER

This folder contains images for the lessons/books.

To test the static file middleware:

1. START: Place image files (jpg, png, etc.) in this folder
2. TEST SUCCESS: Access them via: http://localhost:3000/images/filename.jpg
3. TEST ERROR: Try accessing a non-existent file: http://localhost:3000/images/nonexistent.jpg

The middleware will:
- Serve the image if it exists
- Return a 404 JSON error message if it doesn't exist
- Log all requests to the console

Sample files included for testing:
- book1.txt
- book2.txt  
- book3.txt



