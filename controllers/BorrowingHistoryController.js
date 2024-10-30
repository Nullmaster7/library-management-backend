const { BorrowingHistory, Book, User } = require('../models');

exports.getBorrowingHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const borrowingHistory = await BorrowingHistory.findAll({
            where: { userId: userId },
            include: [
                { model: Book, attributes: ['id', 'title', 'author', 'year'] },
                { model: User, attributes: ['id', 'name'] }
            ],
            order: [['borrowedAt', 'DESC']]
        });

        if (!borrowingHistory.length) {
            return res.status(404).json({ error: 'No borrowing records found.' });
        }
        console.log('Response:', borrowingHistory);

        res.status(200).json(borrowingHistory);
    } catch (error) {
        console.error('Error fetching borrowing history:', error);
        res.status(500).json({ error: 'Failed to fetch borrowing history.' });
    }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
    const userId = req.params.userId; // Changed from req.body to req.params
    const bookId = req.params.bookId; // Changed from req.body to req.params
    try {
        // Check if the book is already borrowed
        const existingBorrowing = await BorrowingHistory.findOne({
            where: {
                bookId: bookId,
                returnedAt: null
            }
        });

        if (existingBorrowing) {
            return res.status(400).json({ error: 'Book is already borrowed.' });
        }

        // Create new borrowing record
        const borrowingRecord = await BorrowingHistory.create({
            userId: userId,
            bookId: bookId,
            borrowedAt: new Date(),
            returnedAt: null,
        });

        console.log('Borrowing Record Created:', borrowingRecord);

        res.status(201).json(borrowingRecord);
    } catch (error) {
        console.error('Error borrowing book:', error);
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

        console.log('Book Returned:', borrowingRecord);

        res.status(200).json(borrowingRecord);
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).json({ error: 'Failed to return book.' });
    }
};


exports.getCurrentOwner = async (req, res) => {
    const { bookId } = req.params;
    try {
        const currentOwner = await BorrowingHistory.findOne({
            where: {
                bookId: bookId,
                returnedAt: null
            },
            include: [
                { model: User, attributes: ['id', 'name', 'email'] },
            ],
            order: [['borrowedAt', 'DESC'], ['id', 'DESC']],
        });

        console.log(`Querying for book ID: ${bookId}`);

        if (!currentOwner) {
            return res.status(404).json({ message: 'Book is currently available.' });
        }

        console.log('Current Owner Response:', currentOwner);
        res.status(200).json(currentOwner);
    } catch (error) {
        console.error('Error fetching current owner:', error);
        res.status(500).json({ error: 'Failed to fetch current owner.' });
    }
};
