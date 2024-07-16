const express = require('express');
const { Book } = require('../model/user.model');
const Joi = require('joi');

// Validation schema
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    published: Joi.date().required(),
    description: Joi.string().required().max(700),
    ratingsCount: Joi.number().default(0),
    reviewsCount: Joi.number().default(0),
});

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error fetching books' });
    }
}

const createBook = async (req, res) => {
    try {
        const { error, value } = bookSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const newBook = new Book(value);
        await newBook.save();

        res.status(200).json({
            status: 'Success',
            message: 'Book created successfully',
            details: { id: newBook._id, ...value }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = bookSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const book = await Book.findByIdAndUpdate(id, value, { new: true });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };