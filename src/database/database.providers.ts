import { DataSource } from 'typeorm';
import { User } from '@biz/user/User';
import { Question } from '@biz/question/Question';
import { Quiz } from '@biz/quiz/Quiz';
import { Option } from '@biz/option/Option';
import { UserTakeQuiz } from '@biz/userTakeQuiz/UserTakeQuiz';
import { UserChooseOption } from '@biz/userChooseOption/UserChooseOption';

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
        entities: [User, Question, Quiz, Option, UserTakeQuiz, UserChooseOption],
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
