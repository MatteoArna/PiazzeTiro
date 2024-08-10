const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HeadQuarter = require('./headQuarter');

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
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    headquarterId: {
        type: DataTypes.INTEGER,
        references: {
            model: HeadQuarter,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'infrastructure_types',
});

InfrastructureType.belongsTo(HeadQuarter, { foreignKey: 'headquarterId' });

module.exports = InfrastructureType;
