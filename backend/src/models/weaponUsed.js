const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = require('./booking');
const Weapon = require('./weapon');

const WeaponUsed = sequelize.define('WeaponUsed', {
    bookingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Booking,
            key: 'id',
        },
    },
    weaponId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Weapon,
            key: 'id',
        },
    },
}, {
    timestamps: false,
    tableName: 'weapons_used',
});

WeaponUsed.belongsTo(Booking, { foreignKey: 'bookingId' });
WeaponUsed.belongsTo(Weapon, { foreignKey: 'weaponId' });

module.exports = Weapon;