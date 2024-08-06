const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InfrastructureType = require('./infrastructureType');

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
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  typeId: {
    type: DataTypes.INTEGER,
    references: {
      model: InfrastructureType,
      key: 'id',
    },
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'infrastructures',
});

Infrastructure.belongsTo(InfrastructureType, { foreignKey: 'typeId' });

module.exports = Infrastructure;
