// bookroutes
const express = require('express');
const router = express.Router();

// Mock data
const books = require('../database/booksData.json');

router.get('/books', books);
// router.get('/books/:id', (req, res) => res.send(books.find(book => book.id === req.params.id)));
router.get('/books:id', booksController);
router.post('/books', booksController);
router.put('/books/:id', booksController);
router.delete('/books/:id', booksController);


