import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';
import { Todos } from 'src/task/task.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'aws-1-ap-southeast-2.pooler.supabase.com',
        port: 5432,
        username: 'postgres.ajzbtmmzjujadamdrvbj',
        password: 'Abcd@1234',
        database: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });

      sequelize.addModels([User, Todos]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
