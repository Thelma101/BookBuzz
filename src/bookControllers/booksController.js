const express = require('express');
const app = express();
const mongoose = require('mongoose');
const book = require('../model/user.model');
const Joi = require('joi');
app.use(express.json());


const bookController = {
    async getAllBooks(req, res) {
        try {
            const books = await Book.find();
            res.json(books);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error fetching books' });
        }
    },

    async createbook(req, res) {
        const bookSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().required(),
            genre: Joi.string().required(),
            published: Joi.date().required(),
            description: Joi.string().required(),
            ratings_count: Joi.number().required(),
            reviews_count: Joi.number().required(),
        });

        try {
            const { error, value } = bookSchema.validate(req.body);
            if (error) {
                res.status(400).json({ error: 'Invalid request data' });
                return;
            }

            const newBook = await book.create(value);
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error creating book' });
        }
    },

    async getBookById(req, res) {
        try {
            const id = req.params.id;
            const book = await book.findById(id);
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.json(book);
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
            const { error, value } = bookSchema.validate(req.body);
            if (error) {
                res.status(400).json({ error: 'Invalid request data' });
                return;
            }

            const id = req.params.id;
            const updatedBook = await book.findByIdAndUpdate(id, value, { new: true });
            if (!updatedBook) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.json(updatedBook);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error updating book' });
        }
    },

    async deleteBook(req, res) {
        try {
            const id = req.params.id;
            const deletedBook = await book.findByIdAndDelete(id);
            if (!deletedBook) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.json({ message: 'Book deleted successfully' });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error deleting book' });
        }
    }
};

module.exports = { bookController };
