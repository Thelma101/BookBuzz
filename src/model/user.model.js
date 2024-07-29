const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  }
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  published: { type: Date, required: true },
  description: { type: String, required: true,  maxlength: [ 700, 'Description is too long' ] },
  ratingsCount: { type: Number, required: true, default: 0 },
  reviewsCount: { type: Number, required: true, default: 0 },
});

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);


module.exports = { User, Book };
