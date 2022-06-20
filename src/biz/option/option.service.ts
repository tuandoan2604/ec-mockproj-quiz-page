import { Option } from './Option';
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService extends BaseService<Option, Repository<Option>> {
  constructor(
    @Inject('OPTION_REPOSITORY')
    repository: Repository<Option>,
  ) {
    super(repository);
  }
}
