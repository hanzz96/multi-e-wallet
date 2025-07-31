import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import CurrencyRate from './CurrencyRate';

class Currencies extends Model {
  public code!: string;
  public rateToUSD!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Currencies.init(
  {
    code: {
      primaryKey: true,
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
    rate_to_usd: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Currencies',
  }
);
Currencies.hasMany(CurrencyRate, { foreignKey: 'currency_code', as: 'rates' });
export default Currencies;
