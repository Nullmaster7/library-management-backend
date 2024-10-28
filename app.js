const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowingHistoryRoutes = require('./routes/borrowingHistoryRoutes');

app.get('/', (req, res) => {
    res.send('Welcome to the Library Management API');
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrowingHistories', borrowingHistoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
