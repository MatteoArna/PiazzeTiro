const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InfrastructureType = sequelize.define('InfrastructureType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    timestamps: false,
    tableName: 'infrastructure_types',
    });

module.exports = InfrastructureType;