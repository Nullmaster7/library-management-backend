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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: 'Rating must be an integer.'
        },
        min: {
          args: [1],
          msg: 'Rating must be at least 1.'
        },
        max: {
          args: [5],
          msg: 'Rating must be at most 5.'
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
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Books',
  });

  return Book;
};
