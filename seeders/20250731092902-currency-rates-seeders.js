'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const startDate = now.toISOString().split('T')[0]; // YYYY-MM-DD

    await queryInterface.bulkInsert('CurrencyRates', [
      // USD
      {
        currency_code: 'USD',
        to_currency_code: 'IDR',
        to_currency_rate: 15500.00,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        currency_code: 'USD',
        to_currency_code: 'JPY',
        to_currency_rate: 158.45,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        currency_code: 'USD',
        to_currency_code: 'EUR',
        to_currency_rate: 0.91,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },

      // IDR
      {
        currency_code: 'IDR',
        to_currency_code: 'USD',
        to_currency_rate: 0.0000645,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        currency_code: 'IDR',
        to_currency_code: 'JPY',
        to_currency_rate: 0.0102,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        currency_code: 'IDR',
        to_currency_code: 'EUR',
        to_currency_rate: 0.000059,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },

      // JPY
      {
        currency_code: 'JPY',
        to_currency_code: 'USD',
        to_currency_rate: 0.0063,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        currency_code: 'JPY',
        to_currency_code: 'IDR',
        to_currency_rate: 97.8,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        currency_code: 'JPY',
        to_currency_code: 'EUR',
        to_currency_rate: 0.0057,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },

      // EUR
      {
        currency_code: 'EUR',
        to_currency_code: 'USD',
        to_currency_rate: 1.1,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        currency_code: 'EUR',
        to_currency_code: 'IDR',
        to_currency_rate: 17000,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        currency_code: 'EUR',
        to_currency_code: 'JPY',
        to_currency_rate: 174.6,
        start_date: startDate,
        end_date: null,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('CurrencyRates', null, {});
  },
};
