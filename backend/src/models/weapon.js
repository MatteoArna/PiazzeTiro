const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Weapon = sequelize.define('Weapon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: false,
    tableName: 'weapons',
});

module.exports = Weapon;