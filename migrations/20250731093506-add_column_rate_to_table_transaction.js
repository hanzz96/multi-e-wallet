'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'rate_to', {
      type: Sequelize.DECIMAL(20, 8),
      allowNull: true, // or false, depending on your logic
      after: 'related_wallet_balance_id', // optional, just for ordering
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'rate_to');
  },
};
