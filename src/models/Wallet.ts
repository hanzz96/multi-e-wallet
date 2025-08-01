import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './User';
import WalletBalance from './WalletBalance';
class Wallet extends Model {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public WalletBalances?: WalletBalance[]; // optional array
}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Wallet',
  }
);

Wallet.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Wallet, { foreignKey: 'user_id' });

export default Wallet;
