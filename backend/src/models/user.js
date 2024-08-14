const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserRole = require('./userRole');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserRole,
      key: 'id',
    },
    allowNull: false,
  },
  society: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en',
  }
}, {
  timestamps: true,
  tableName: 'users',
});

User.belongsTo(UserRole, { foreignKey: 'roleId' });

module.exports = User;
