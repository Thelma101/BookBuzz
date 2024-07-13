const express = require('express');

router = express.Router();

// router.use(json())

router.post('/', register);
router.post('/login', login);
router.put('/user/:id', editUser);
router.delete('/user/:id', deleteUser);

module.exports = router;