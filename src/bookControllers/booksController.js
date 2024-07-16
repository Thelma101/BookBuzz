const express = require('express');
const app = express();
const { Book } = require('../model/user.model');

const createBook = async (req, res) => {
  try {
    const { title, author, genre, published, description } = req.body;
    const newBook = await Book.create({ title, author, genre, published, description });
    await newBook.save();

    res.status(200).json({
      status: 'Success',
      message: 'Book created successfully',
      details: { id: newBook._id, title, author, genre, published, description }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBook = async (req, res) => {
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
    const { title, author, genre, published, description } = req.body;
    const book = await Book.findByIdAndUpdate(id, { title, author, genre, published, description }, { new: true });

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

module.exports = { createBook, getBook, updateBook, deleteBook };
