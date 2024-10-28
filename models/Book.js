'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.BorrowingHistory, { foreignKey: 'bookId' });
    }
  }

  Book.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Title must be between 1 and 255 characters long.'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Author name must be between 1 and 255 characters long.'
        }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: 'Year must be an integer.'
        },
        min: {
          args: [1000],
          msg: 'Year must be greater than 1000.'
        },
        max: {
          args: [new Date().getFullYear()],
          msg: 'Year cannot be in the future.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Books',
  });

  return Book;
};
