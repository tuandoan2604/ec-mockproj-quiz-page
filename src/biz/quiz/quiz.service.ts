import { Quiz } from './Quiz';
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService extends BaseService<Quiz, Repository<Quiz>> {
  constructor(
    @Inject('QUIZ_REPOSITORY')
    repository: Repository<Quiz>,
  ) {
    super(repository);
  }
  getDetail(id: string): Promise<Quiz> {
    return (
      this.repository
        .createQueryBuilder('q')
        .leftJoinAndSelect('q.questions', 'qu')
        .leftJoinAndSelect('qu.options', 'o')
        // .select(['q.*', 'qu.*'])
        .where('q.id = :id', { id })
        .getOne()
    );
  }
}
