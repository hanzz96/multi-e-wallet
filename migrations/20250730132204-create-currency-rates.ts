'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CurrencyRates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      currency_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Currencies',
          key: 'code',
        },
        onDelete: 'CASCADE',
      },
      to_currency_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to_currency_rate: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CurrencyRates');
  },
};
