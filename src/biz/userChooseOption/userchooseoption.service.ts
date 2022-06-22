import { UserChooseOption } from './UserChooseOption';
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserChooseOptionService extends BaseService<UserChooseOption, Repository<UserChooseOption>> {
  constructor(
    @Inject('USERCHOOSEOPTION_REPOSITORY')
    repository: Repository<UserChooseOption>,
  ) {
    super(repository);
  }
}
