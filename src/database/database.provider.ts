import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Todos } from '../task/task.entity';
import pg from 'pg';

const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectModule: pg,
  host: 'aws-1-ap-southeast-1.pooler.supabase.com',
  port: 5432,
  username: 'postgres.lyoebknxanxqshedtwpr',
  password: 'Abcd@1234',
  database: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

sequelize.addModels([User, Todos]);

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      await sequelize.sync();
      return sequelize;
    },
  },
];
