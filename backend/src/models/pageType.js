const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PageType = sequelize.define('PageType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'page_types',
});

module.exports = PageType;
