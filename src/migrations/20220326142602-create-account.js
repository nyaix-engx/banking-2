'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      account_Number: {
        type: Sequelize.BIGINT
      },
      cash_Balance: {
        type: Sequelize.DECIMAL
      },
      account_Type: {
        type: Sequelize.STRING
      },
      account_Pin: {
        type: Sequelize.INTEGER
      },
      share_Balance: {
        type: Sequelize.DECIMAL
      },
      account_Owner: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};