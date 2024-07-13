const express = require('express');
const { register, login, updateUser, deleteUser } = require('../bookControllers/auth')
router = express.Router();

// router.use(json())

router.post('/', register);
router.post('/login', login);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;