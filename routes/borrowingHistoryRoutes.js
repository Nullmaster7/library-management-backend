const express = require('express');
const router = express.Router();
const BorrowingHistoryController = require('../controllers/BorrowingHistoryController');

router.post('/users/:userId/borrow/:bookId', BorrowingHistoryController.borrowBook);

router.post('/users/:userId/return/:bookId', BorrowingHistoryController.returnBook);

module.exports = router;
