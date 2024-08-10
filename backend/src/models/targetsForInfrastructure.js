const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importa i modelli correttamente
const Target = require('./target');
const InfrastructureType = require('./InfrastructureType');

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

// Definisci le associazioni solo dopo aver caricato i modelli
TargetsForInfrastructure.belongsTo(Target, { foreignKey: 'targetId' });
TargetsForInfrastructure.belongsTo(InfrastructureType, { foreignKey: 'infrastructureTypeId' });

module.exports = TargetsForInfrastructure;
