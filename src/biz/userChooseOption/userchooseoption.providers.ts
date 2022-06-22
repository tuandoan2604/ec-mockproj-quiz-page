import { DataSource } from 'typeorm';
import { UserChooseOption } from './UserChooseOption';

export const userChooseOptionProviders = [
  {
    provide: 'USERCHOOSEOPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserChooseOption),
    inject: ['DATA_SOURCE'],
  },
];
