const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { User } = require('../model/user.model');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    res.status(200).json({
      status: 'Success',
      message: 'Registration Successful',
      details: { id: newUser._id, name, email }
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(`Login attempt with email: ${email} and password: ${password}`);

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log(`User found: ${user.email}`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log(`Password mismatch for user: ${user.email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JSON Web Token (JWT) for the user
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login, updateUser, deleteUser };