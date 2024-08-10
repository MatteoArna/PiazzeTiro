const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Infrastructure = require('./infrastructure');
const InfrastructureType = require('./infrastructureType');
const Target = require('./target');

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
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  start: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  nPartecipants: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  target: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Target,
      key: 'id',
    }
  }
}, {
  timestamps: false,
  tableName: 'bookings',
});

Booking.belongsTo(User, { foreignKey: 'idCustomer' });
Booking.belongsTo(Infrastructure, { foreignKey: 'idInfrastructure' });
Booking.belongsTo(InfrastructureType, { foreignKey: 'infrastructureType' });
Booking.belongsTo(Target, { foreignKey: 'target' });

module.exports = Booking;
