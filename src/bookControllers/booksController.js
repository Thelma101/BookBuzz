const express = require('express');
const app = express();
const books = require('../database/booksData.json');

app.use(express.json());

const bookController = {
    async createBook (req, res) {
        // Create a new book
        const newBook = req.body;
        res.json({ id: books.length + 1, 
            title: newBook.title, 
            author: newBook.author });
    }
    async getBookById(req, res) {
        const bookId = req.params.id;
        const book = books.find((book) => book.id === parseInt(bookId));
        if (!book) {
          res.status(404).json({ message: `Book not found` });
        } else {
          res.json(book);
        }

        
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
