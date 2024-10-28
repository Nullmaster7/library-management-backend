const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBook);


module.exports = router;
