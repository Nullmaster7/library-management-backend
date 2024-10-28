const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUser);

module.exports = router;
