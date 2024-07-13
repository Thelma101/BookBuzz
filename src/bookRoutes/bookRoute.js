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


async function booksController(req, res) {
    try {
        if (req.method === 'GET') {
            if (req.params.id) {
                const book = await findBookById(req.params.id);
                if (book) {
                    res.send(book);
                } else {
                    res.status(404).send('Book not found');
                }
            } else {
                res.send(books);
            }
        } else if (req.method === 'POST') {
            const newBook = req.body;
            books.push(newBook);
            res.status(201).send(newBook);
        } else if (req.method === 'PUT') {
            const updatedBook = req.body;
            const index = books.findIndex(book => book.id === parseInt(req.params.id));
            if (index > -1) {
                books[index] = updatedBook;
                res.send(updatedBook);
            } else {
                res.status(404).send('Book not found');
            }
        } else if (req.method === 'DELETE') {
            const index = books.findIndex(book => book.id === parseInt(req.params.id));
            if (index > -1) {
                books.splice(index, 1);
                res.status(204).send();
            } else {
                res.status(404).send('Book not found');

                async function findBookById(id) {
                    try {
                        const book = await books.find(book => book.id === parseInt(id));
                        return book;
                    }
                    catch (error) {
                        console.error(error);
                        throw error;
                    }
                }
            }
        else {
                res.status(405).send('Method not allowed');
            }