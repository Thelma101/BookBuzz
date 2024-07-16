const express = require('express');
const router = express.Router();
const { getAllBooks, createBook, getBookById, updateBook, deleteBook } = require('../bookControllers/booksController');

router.get('/', getAllBooks);
router.post('/books', createBook);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

module.exports = router;