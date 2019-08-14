import dotenv from 'dotenv';
dotenv.config();
import { Config } from 'knex';

const config: Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './src/migrations',
  },
};

module.exports = config;
