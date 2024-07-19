const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const PageType = require('./pageType');

const Page = sequelize.define('Page', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  file: {
    type: DataTypes.STRING, // O DataTypes.BLOB se vuoi salvare il file come binario
    allowNull: true,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  typeId: {
    type: DataTypes.INTEGER,
    references: {
      model: PageType,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'pages',
});

Page.belongsTo(PageType, { foreignKey: 'typeId' });

module.exports = Page;
