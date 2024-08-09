const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Target = require('./target');
const InfrastructureType = require('./infrastructureType');

const TargetsForInfrastructure = sequelize.define('TargetsForInfrastructure', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    targetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Target,
            key: 'id'
        }
    },

    infrastructureTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InfrastructureType,
            key: 'id'
        }
    },
},{
    tableName: 'targets_for_infrastructure',
    timestamps: false
});

module.exports = TargetsForInfrastructure;