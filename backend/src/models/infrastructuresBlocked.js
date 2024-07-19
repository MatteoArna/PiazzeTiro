const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Infrastructure = require('./infrastructure');

const InfrastructuresBlocked = sequelize.define('InfrastructuresBlocked', {
  infrastructureId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Infrastructure,
      key: 'id',
    },
    allowNull: false,
  },
  blockedId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Infrastructure,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'infrastructures_blocked',
});

Infrastructure.belongsToMany(Infrastructure, { through: InfrastructuresBlocked, as: 'Blocked', foreignKey: 'infrastructureId', otherKey: 'blockedId' });
Infrastructure.belongsToMany(Infrastructure, { through: InfrastructuresBlocked, as: 'Blocking', foreignKey: 'blockedId', otherKey: 'infrastructureId' });

module.exports = InfrastructuresBlocked;
