const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HeadQuarter = sequelize.define('HeadQuarter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'head_quarters',
});

module.exports = HeadQuarter;
