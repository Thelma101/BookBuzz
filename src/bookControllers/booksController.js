const express = require('express');
const app = express();
const books = require('../database/booksData.json');
const Joi = require('joi');

app.use(express.json());

const bookController = {
    async getAllBooks(req, res) {
        try {
            res.json([...books]); // Create a copy of the books array
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error fetching books' });
        }
    },

    async createBook(req, res) {
        const bookSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().required(),
            genre: Joi.string().required(),
            published: Joi.date().required(),
            description: Joi.string().required(),
            ratings_count: Joi.number().required(),
            reviews_count: Joi.number().required()
        });

        try {
            const { error } = bookSchema.validate(req.body);
            if (error) {
                res.status(400).json({ error: 'Invalid request data' });
                return;
            }

            const newBook = {
                id: books.length + 1,
                ...req.body
            };
            const newBooks = [...books, newBook]; // Create a copy of the books array
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error creating book' });
        }
    },

    async getBookById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const book = books.find((book) => book.id === id);
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.json({ ...book }); // Create a copy of the book object
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error fetching book' });
        }
    },

    async updateBook(req, res) {
        const bookSchema = Joi.object({
            title: Joi.string(),
            author: Joi.string(),
            genre: Joi.string(),
            published: Joi.date(),
            description: Joi.string(),
            ratings_count: Joi.number(),
            reviews_count: Joi.number()
        });

        try {
            const { error } = bookSchema.validate(req.body);
            if (error) {
                res.status(400).json({ error: 'Invalid request data' });
                return;
            }

            const id = parseInt(req.params.id);
            const book = books.find((book) => book.id === id);
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                const updatedBook = { ...book, ...req.body }; // Create a copy of the book object
                res.json(updatedBook);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error updating book' });
        }
    },

    async deleteBook(req, res) {
        try {
            const id = parseInt(req.params.id);
            const index = books.findIndex((book) => book.id === id);
            if (index === -1) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                const newBooks = [...books]; // Create a copy of the books array
                newBooks.splice(index, 1);
                res.json({ message: 'Book deleted successfully' });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error deleting book' });
        }
    }
};

module.exports = { bookController };