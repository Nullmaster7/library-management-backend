const { BorrowingHistory, Book, User } = require('../models');

// borrow book
exports.borrowBook = async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        const book = await Book.findByPk(bookId);
        const user = await User.findByPk(userId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // check if book is already borrowed
        const existingBorrowing = await BorrowingHistory.findOne({
            where: {
                bookId: book.id,
                returnedAt: null
            }
        });

        if (existingBorrowing) {
            return res.status(400).json({ error: 'Book is already borrowed.' });
        }

        // create new borrowing record
        const borrowingRecord = await BorrowingHistory.create({
            userId: user.id,
            bookId: book.id,
            borrowedAt: new Date(),
            returnedAt: null,
        });

        res.status(201).json(borrowingRecord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to borrow book.' });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        const borrowingRecord = await BorrowingHistory.findOne({
            where: {
                userId: userId,
                bookId: bookId,
                returnedAt: null
            }
        });

        if (!borrowingRecord) {
            return res.status(404).json({ error: 'Borrowing record not found.' });
        }

        borrowingRecord.returnedAt = new Date();
        await borrowingRecord.save();

        res.status(200).json(borrowingRecord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to return book.' });
    }
};
