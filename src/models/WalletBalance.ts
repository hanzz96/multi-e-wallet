import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Wallet from './Wallet';
import Currencies from './Currencies';

class WalletBalance extends Model {
  public id!: number;
  public wallet_id!: number;
  public currency_code!: number;
  public amount!: number;
}

WalletBalance.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'WalletBalance',
  }
);

WalletBalance.belongsTo(Wallet, { foreignKey: 'wallet_id' });
Wallet.hasMany(WalletBalance, { foreignKey: 'wallet_id' });

WalletBalance.belongsTo(Currencies, { foreignKey: 'currency_code' });
Currencies.hasMany(WalletBalance, { foreignKey: 'currency_code' });

export default WalletBalance;
