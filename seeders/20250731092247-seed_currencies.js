'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Currencies', [
      {
        code: 'USD',
        name: 'United States Dollar',
        rate_to_usd: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        code: 'IDR',
        name: 'Indonesian Rupiah',
        rate_to_usd: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        code: 'JPY',
        name: 'Japanese Yen',
        rate_to_usd: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        code: 'EUR',
        name: 'Euro',
        rate_to_usd: 0,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Currencies', {
      code: ['USD', 'IDR', 'JPY', 'EUR'],
    });
  },
};
