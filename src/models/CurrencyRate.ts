'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class CurrencyRate extends Model {
    static associate(models: any) {
      CurrencyRate.belongsTo(models.Currency, { foreignKey: 'currencyId' });
    }
  }

  CurrencyRate.init(
    {
      currencyId: DataTypes.INTEGER,
      to_currency_code: DataTypes.STRING,
      to_currency_rate: DataTypes.DECIMAL(20, 8),
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'CurrencyRate',
    }
  );

  return CurrencyRate;
};
