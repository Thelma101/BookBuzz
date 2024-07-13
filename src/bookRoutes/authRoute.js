const express = require('express');
const router = express.Router();
const { register, login, updateUser, deleteUser } = require('../bookControllers/auth');

router.post('/', register);
router.post('/login', login);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;