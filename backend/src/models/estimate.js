const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Estimate = sequelize.define('Estimate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  document: {
    type: DataTypes.STRING, // Puoi usare DataTypes.BLOB se preferisci salvare i file come binari
    allowNull: false,
  },
  customerId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'email',
    },
    allowNull: false,
  },
  dateStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateEnd: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'estimates',
});

Estimate.belongsTo(User, { foreignKey: 'customerId' });

module.exports = Estimate;
