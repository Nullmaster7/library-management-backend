const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [{ model: BorrowingHistory }],
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user.' });
    }
};
