import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface CurrencyRateAttributes {
  id: number;
  currency_code: string;
  to_currency_code: string;
  to_currency_rate: number;
  start_date: Date;
  end_date?: Date | null;
}

interface CurrencyRateCreationAttributes extends Optional<CurrencyRateAttributes, 'id'> {}

class CurrencyRate extends Model<CurrencyRateAttributes, CurrencyRateCreationAttributes>
  implements CurrencyRateAttributes {
  public id!: number;
  public currency_code!: string;
  public to_currency_code!: string;
  public to_currency_rate!: number;
  public start_date!: Date;
  public end_date?: Date | null;
}

CurrencyRate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    currency_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_currency_code: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    to_currency_rate: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'CurrencyRate',
    tableName: 'CurrencyRates',
  }
);

export default CurrencyRate;
