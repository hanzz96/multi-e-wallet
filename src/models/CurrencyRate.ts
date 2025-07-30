import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export class CurrencyRate extends Model {}

CurrencyRate.init(
  {
    rate_to_usd: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'CurrencyRate',
    tableName: 'CurrencyRates',
  }
);
