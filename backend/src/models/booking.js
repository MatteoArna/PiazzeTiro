const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Infrastructure = require('./infrastructure');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idCustomer: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'email',
    },
    allowNull: false,
  },
  idInfrastructure: {
    type: DataTypes.INTEGER,
    references: {
      model: Infrastructure,
      key: 'id',
    },
    allowNull: false,
  },
  hours: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'bookings',
});

Booking.belongsTo(User, { foreignKey: 'idCustomer' });
Booking.belongsTo(Infrastructure, { foreignKey: 'idInfrastructure' });

module.exports = Booking;
