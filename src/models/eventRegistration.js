'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        EventRegistration.belongsTo(models.Event, {
          foreignKey: 'eventId'
        });
        EventRegistration.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        EventRegistration.belongsTo(models.Allcode, {
          foreignKey: 'statusCostCode',
          targetKey: 'keyName',
          as: 'statusCost'
        });
        EventRegistration.belongsTo(models.Allcode, {
          foreignKey: 'payMethodCode',
          targetKey: 'keyName',
          as: 'payMethod'
        });
      }
  };
  EventRegistration.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registeredAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    statusCostCode: DataTypes.STRING(50),
    payMethodCode: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'EventRegistration',
  });
  return EventRegistration;
};