const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@ ]+$/ },
  password: { type: String, required: true, minlength: 4, match: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/ },
  name: { type: String, required: true },
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  published: { type: Date, required: true },
  description: { type: String, required: true, maxlength: 500 },
  ratingsCount: { type: Number, required: true, default: 0 },
});

  const User = mongoose.model('User', userSchema);
  const Book = mongoose.model('Book', bookSchema);


// const userBook = mongoose.model('Book', bookSchema, 'User', userSchema);

module.exports = { User, Book };