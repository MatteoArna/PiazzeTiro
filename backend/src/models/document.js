const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Assicurati che il percorso al modello User sia corretto

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'email',
    },
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Aggiunge i campi createdAt e updatedAt
  tableName: 'documents',
});

Document.belongsTo(User, { foreignKey: 'userId' });

module.exports = Document;
