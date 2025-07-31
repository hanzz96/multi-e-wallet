import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ?(msg) => {
      console.log(`[SQL] ${msg}`);
    } : false,
  }
);

export const connectDB = async (): Promise<void> => {
  try {
    console.log(process.env.NODE_ENV, 'node env');
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};