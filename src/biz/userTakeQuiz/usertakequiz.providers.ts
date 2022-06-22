import { DataSource } from 'typeorm';
import { UserTakeQuiz } from './UserTakeQuiz';

export const userTakeQuizProviders = [
  {
    provide: 'USERTAKEQUIZ_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserTakeQuiz),
    inject: ['DATA_SOURCE'],
  },
];
