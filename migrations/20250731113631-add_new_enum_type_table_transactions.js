'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Transactions_type" ADD VALUE IF NOT EXISTS 'payment';
    `);
  },

  async down(queryInterface, Sequelize) {
    // NOTE: PostgreSQL does not support removing enum values easily.
    // You may want to leave this empty or recreate the enum if needed.
  }
};
