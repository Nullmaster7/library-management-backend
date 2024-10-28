'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.BorrowingHistory, { foreignKey: 'userId' });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Name must be between 1 and 255 characters long.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email address must be unique.'
      },
      validate: {
        isEmail: {
          msg: 'Email address must be valid.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  return User;
};
