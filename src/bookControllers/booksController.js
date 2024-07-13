const express = require('express');
const app = express();
const books = require('../database/booksData.json');

app.use(express.json());

const bookController = {
    async getAllBooks(req, res) {
        try {
            res.json(books);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error fetching books' });
        }
    },

    async createBook(req, res) {
        try {
            const { title, author, genre, published, description, ratings_count, reviews_count } = req.body;
            const newBook = {
                id: books.length + 1,
                title,
                author,
                genre,
                published,
                description,
                ratings_count,
                reviews_count
            };
            books.push(newBook);
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
                res.json(book);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error fetching book' });
        }
    },

    async updateBook(req, res) {
        try {
            const id = parseInt(req.params.id);
            const book = books.find((book) => book.id === id);
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                const { title, author, genre, published, description, ratings_count, reviews_count } = req.body;
                book.title = title;
                book.author = author;
                book.genre = genre;
                book.published = published;
                book.description = description;
                book.ratings_count = ratings_count;
                book.reviews_count = reviews_count;
                res.json(book);
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
                books.splice(index, 1);
                res.json({ message: 'Book deleted successfully' });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error deleting book' });
        }
    }
};

module.exports = {bookController}