const { Book, BorrowingHistory } = require('../models/');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books.' });
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
