const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Infrastructure = require('./infrastructure');
const InfrastructureType = require('./infrastructureType');
const HeadQuarter = require('./headQuarter');

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
    allowNull: true,
  },
  idHeadQuarter: {
    type: DataTypes.INTEGER,
    references: {
      model: HeadQuarter,
      key: 'id',
    },
    allowNull: false,
  },
  infrastructureType: {
    type: DataTypes.INTEGER,
    references: {
      model: InfrastructureType,
      key: 'id',
    },
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  subDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  start: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  subStart: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  subEnd: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  nPartecipants: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'bookings',
});

Booking.belongsTo(User, { foreignKey: 'idCustomer' });
Booking.belongsTo(Infrastructure, { foreignKey: 'idInfrastructure' });
Booking.belongsTo(InfrastructureType, { foreignKey: 'infrastructureType' });
Booking.belongsTo(HeadQuarter, { foreignKey: 'idHeadQuarter' });

module.exports = Booking;
