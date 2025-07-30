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
      rate_to_usd: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CurrencyRates');
  },
};
