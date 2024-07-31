const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HeadQuarter = require('./headQuarter');

const Infrastructure = sequelize.define('Infrastructure', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  headquarterId: {
    type: DataTypes.INTEGER,
    references: {
      model: HeadQuarter,
      key: 'id',
    },
    allowNull: false,
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'infrastructures',
});

Infrastructure.belongsTo(HeadQuarter, { foreignKey: 'headquarterId' });

module.exports = Infrastructure;
