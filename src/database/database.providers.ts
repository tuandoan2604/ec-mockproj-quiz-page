import { DataSource } from 'typeorm';
import { User } from '@biz/user/User';
import { Question } from '@biz/question/Question';
import { Quiz } from '@biz/quiz/Quiz';
import { Option } from '@biz/option/Option';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB_NAME,
        entities: [User, Question, Quiz, Option],
        // synchronize: true,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      return dataSource.initialize();
    },
  },
];
