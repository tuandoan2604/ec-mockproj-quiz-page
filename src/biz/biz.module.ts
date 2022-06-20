import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { QuizService } from './quiz/quiz.service';
import { QuestionService } from './question/question.service';
import { OptionService } from './option/option.service';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz/Quiz';
import { Question } from './question/Question';
import { Option } from './option/Option';
import { quizProviders } from './quiz/quiz.providers';
import { questionProviders } from './question/question.providers';
import { optionProviders } from './option/option.providers';
import { DatabaseModule } from 'src/database/database.module';

const listProviders = [
  UserService,
  AuthService,
  QuizService,
  QuestionService,
  OptionService,
  ...quizProviders,
  ...questionProviders,
  ...optionProviders,
];
@Module({
  imports: [DatabaseModule],
  providers: listProviders,
  exports: listProviders,
})
export class BizModule {}
