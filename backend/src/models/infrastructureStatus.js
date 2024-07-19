const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InfrastructureStatus = sequelize.define('InfrastructureStatus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'infrastructure_statuses',
});

module.exports = InfrastructureStatus;
