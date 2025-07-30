import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Currencies extends Model {
  public id!: number;
  public code!: string;
  public rateToUSD!: number;
}

Currencies.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
    rateToUSD: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Currencies',
  }
);

export default Currencies;
