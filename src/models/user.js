'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User thuộc về một Position trong Allcode
      User.belongsTo(models.Allcode, {
        foreignKey: 'positionId', // Khóa ngoại trong bảng User
        targetKey: 'key',  // Khóa tham chiếu trong bảng Allcode
        as: 'positionData'  //Tên alias để sử dụng trong include
      });
          // Add new relationship with Markdown
    User.hasOne(models.Markdown, {
      foreignKey: 'doctorId',
      as: 'doctorMarkdown'
  });
    }
  }7;
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.TEXT('long'), 
    roleID: DataTypes.STRING,
    positionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};