import { UserTakeQuiz } from './UserTakeQuiz';
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserTakeQuizService extends BaseService<UserTakeQuiz, Repository<UserTakeQuiz>> {
  constructor(
    @Inject('USERTAKEQUIZ_REPOSITORY')
    repository: Repository<UserTakeQuiz>,
  ) {
    super(repository);
  }
  getListDetail(skip, limit): Promise<UserTakeQuiz[]> {
    return (
      this.repository
        .createQueryBuilder('utq')
        .leftJoinAndSelect('utq.quiz', 'qu')
        // .select(['q.*', 'qu.*'])
        // .where('q.id = :listId', { listId })
        .skip(skip)
        .take(limit)
        .getMany()
    );
  }
}
