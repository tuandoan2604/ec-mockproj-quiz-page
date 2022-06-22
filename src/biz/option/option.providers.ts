import { DataSource } from 'typeorm';
import { Option } from './Option';

export const optionProviders = [
  {
    provide: 'OPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Option),
    inject: ['DATA_SOURCE'],
  },
];
