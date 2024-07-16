const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { User } = require('../model/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate request
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(`Hashed password: ${hashedPassword}`);

    // Create a new user
    const newUser = new User({ email: email.toLowerCase(), password: hashedPassword, name });
    await newUser.save();

    res.status(200).json({
      status: 'Success',
      message: 'Registration Successful',
      details: { id: newUser._id, name, email: newUser.email }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(`Login attempt with email: ${email}`);

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log(`User found: ${user.email}`);
    console.log(`Stored hashed password: ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log(`Password mismatch for user: ${user.email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JSON Web Token (JWT) for the user
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Validate request
    if (!id || (!name && !email && !password)) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    let updateData = { name, email: email ? email.toLowerCase() : undefined };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      status: 'Success',
      message: 'User updated successfully',
      details: updatedUser
    });
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      status: 'Success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error during delete:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login, updateUser, deleteUser };
