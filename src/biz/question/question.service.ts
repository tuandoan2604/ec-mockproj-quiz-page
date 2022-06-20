import { Question } from './Question';
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService extends BaseService<Question, Repository<Question>> {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    repository: Repository<Question>,
  ) {
    super(repository);
  }
}
