'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    static associate(models) {
      // Define associations
      Markdown.belongsTo(models.Allcode, {
        foreignKey: 'positionId',
        targetKey: 'keyName',
        as: 'positionData'
      });

      Markdown.belongsTo(models.Allcode, {
        foreignKey: 'eventId',
        targetKey: 'keyName',
        as: 'eventData'
      });
    }
  }

  Markdown.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    positionId: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    eventId: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    contentHTML: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contentMarkdown: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Markdown',
    timestamps: true // Enables createdAt and updatedAt
  });

  return Markdown;
};