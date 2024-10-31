const { Book, BorrowingHistory } = require('../models/');
const { Op } = require('sequelize');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: BorrowingHistory,
                    required: false,
                    where: {
                        [Op.or]: [
                            { returnedAt: { [Op.ne]: null } },
                            { returnedAt: null }
                        ]
                    },
                    order: [['borrowedAt', 'DESC']],
                    limit: 1
                }
            ]
        });

        const availableBooks = books.filter(book => {
            const latestHistory = book.BorrowingHistories[0];
            return !latestHistory || latestHistory.returnedAt !== null;
        });

        res.status(200).json(availableBooks);
    } catch (error) {
        console.error('Error fetching available books:', error);
        res.status(500).json({ error: 'Failed to fetch available books.' });
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: [{ model: BorrowingHistory }],
        });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Book not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch book.' });
    }
};

