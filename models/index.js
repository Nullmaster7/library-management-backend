const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
});

const User = require('./User')(sequelize, DataTypes);
const Book = require('./Book')(sequelize, DataTypes);
const BorrowingHistory = require('./BorrowingHistory')(sequelize, DataTypes);

User.hasMany(BorrowingHistory, { foreignKey: 'userId' });
BorrowingHistory.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(BorrowingHistory, { foreignKey: 'bookId' });
BorrowingHistory.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { sequelize, User, Book, BorrowingHistory };
