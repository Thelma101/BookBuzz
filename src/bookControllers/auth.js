
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

// const user = require('../model/booksData.json')
const user = require('../model/user.model');
const { joi } = require('joi')

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = await user.create({ email, password, name });
    // res.status(201).json(newUser);
    res.status(200).json({
      status: 'Success',
      message: 'Registration Succussful',
      details: { id: newUser._id, name, email }
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await user.findOne({ email });

    if (!userLogin) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    // const userPassword = await bcrypt.compare(password, userLogin.password);
    // if (!userPassword) {
    //   return res.status(401).json({ error: 'Invalid password' });
    // }

    const userPassword = ((password) === (userLogin.password));
    if (!userPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await user.findByIdAndUpdate(id, { name, email, password }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login, updateUser, deleteUser };



// compare old file with new
// const express = require('express');
// const app = express();
// const books = require('../database/booksData.json')


// app.use(express.json());
// // register login

// const auth = async (req, res) => {
//     const register = async (req, res, next) => {
//         try {
//             const { email, password, name } = req.body;
//             const newUser = await user.create({ email, password, name });
//             res.status(201).json(newUser);

//         } catch (error) {
//             console.error(error);
//         }
//     }
//     // joi validation error

//     const login = async (req, res, next) => {
//         try {
//             const { email, password } = req.body;
//             const user = await user.findOne({ email });

//             if (!user || !(await user.comparePassword(password))) {
//                 return res.status(401).json({ error: 'Invalid email or password' });
//             }

//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const updateUser = async (req, res) => {
//         try {
//             const { id } = req.params;
//             const { name, email, password } = req.body;
//             const user = await user.findByIdAndUpdate(id, { name, email, password }, { new: true });
//             res.status(200).json(user);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }

//     const deleteUser = async (req, res) => {
//         try {
//             const { id } = req.params;
//             await user.findByIdAndDelete(id);
//             res.status(204).json();
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }
// }

// module.exports = { auth };