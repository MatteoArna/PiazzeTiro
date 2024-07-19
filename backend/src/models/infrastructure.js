const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HeadQuarter = require('./headQuarter');
const InfrastructureStatus = require('./infrastructureStatus');

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
    references: {
      model: InfrastructureStatus,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'infrastructures',
});

Infrastructure.belongsTo(HeadQuarter, { foreignKey: 'headquarterId' });
Infrastructure.belongsTo(InfrastructureStatus, { foreignKey: 'statusId' });

module.exports = Infrastructure;
