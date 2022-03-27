'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account.init({
    account_Number: DataTypes.BIGINT,
    cash_Balance: DataTypes.DECIMAL,
    account_Type: DataTypes.STRING,
    account_Pin: DataTypes.INTEGER,
    share_Balance: DataTypes.DECIMAL,
    account_Owner: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};