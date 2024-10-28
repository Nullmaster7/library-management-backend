'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BorrowingHistory extends Model {
    static associate(models) {
      BorrowingHistory.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      BorrowingHistory.belongsTo(models.Book, { foreignKey: 'bookId', onDelete: 'CASCADE' });
    }
  }

  BorrowingHistory.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'userId must be an integer.'
        }
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'bookId must be an integer.'
        }
      }
    },
    borrowedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'borrowedAt must be a valid date.'
        }
      }
    },
    returnedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          msg: 'returnedAt must be a valid date.'
        },
        isAfter(value) {
          if (this.borrowedAt && new Date(value) <= new Date(this.borrowedAt)) {
            throw new Error('returnedAt must be after borrowedAt.');
          }
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
    }
  }, {
    sequelize,
    modelName: 'BorrowingHistory',
    tableName: 'BorrowingHistories',
  });

  return BorrowingHistory;
};
