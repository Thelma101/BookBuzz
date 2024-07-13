const express = require('express');
const app = express();
const books = require('../database/booksData.json');



const bookController = {
async = await bookController {
    app.get('/books/:id', (req, res) => {
        // Return a single book by ID
        const bookId = req.params.id;
        res.json({
            id: bookId, title: `Book ${bookId}`, author: `Author ${bookId}`
        });
    });
    
    app.post('/books', (req, res) => {
        // Create a new book
        const book = req.body;
        res.json({ id: 3, title: book.title, author: book.author });
    });
    
    app.put('/books/:id', (req, res) => {
        // Update a book
        const bookId = req.params.id;
        const book = req.body;
        res.json({ id: bookId, title: book.title, author: book.author });
    });
    
    app.delete('/books/:id', (req, res) => {
        // Delete a book
        const bookId = req.params.id;
        res.json({ message: `Book ${bookId} deleted` });
    });
    
}
