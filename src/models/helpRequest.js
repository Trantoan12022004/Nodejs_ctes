'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HelpRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        HelpRequest.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        HelpRequest.belongsTo(models.Allcode, {
          foreignKey: 'requestTypeCode',
          targetKey: 'keyName',
          as: 'requestType'
        });
        HelpRequest.belongsTo(models.Allcode, {
          foreignKey: 'statusCode',
          targetKey: 'keyName',
          as: 'status'
        });
      }
  };
  HelpRequest.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    requestTypeCode: DataTypes.STRING(50),
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    requestedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    statusCode: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'HelpRequest',
  });
  return HelpRequest;
};