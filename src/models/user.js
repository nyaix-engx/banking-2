'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    cust_Name: DataTypes.STRING,
    cust_Address: DataTypes.STRING,
    cust_Telephone: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};