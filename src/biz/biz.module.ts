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
import { UserTakeQuizService } from './userTakeQuiz/usertakequiz.service';
import { UserChooseOptionService } from './userChooseOption/userchooseoption.service';
import { userTakeQuizProviders } from './userTakeQuiz/usertakequiz.providers';
import { userChooseOptionProviders } from './userChooseOption/userchooseoption.providers';

const listProviders = [
  UserService,
  AuthService,
  QuizService,
  QuestionService,
  OptionService,
  UserTakeQuizService,
  UserChooseOptionService,
  ...quizProviders,
  ...questionProviders,
  ...optionProviders,
  ...userTakeQuizProviders,
  ...userChooseOptionProviders,
];
@Module({
  imports: [DatabaseModule],
  providers: listProviders,
  exports: listProviders,
})
export class BizModule {}
