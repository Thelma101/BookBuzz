// bookroutes
const express = require('express');
const router = express.Router();
const book = require('../bookControllers/booksController')


// router.get('/books/:id', (req, res) => res.send(books.find(book => book.id === req.params.id)));
router.get('/books:id', book);
router.post('/books', book);
router.put('/books/:id', book);
router.delete('/books/:id', book);

module.exports = router;