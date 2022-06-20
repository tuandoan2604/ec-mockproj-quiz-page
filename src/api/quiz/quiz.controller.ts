import { JwtPayload } from '@biz/auth/auth.dto';
import { OptionService } from '@biz/option/option.service';
import { QuestionService } from '@biz/question/question.service';
import { QuizService } from '@biz/quiz/quiz.service';
import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from 'src/biz/user/user.service';
import { UserReq } from '../decorator/user.decorator';
import { QuizCreateDTO, QuizDTO } from './quiz.dto';
import { QuizTranform } from './quiz.tranform';
@Controller('/quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService,
  ) {}
  @Post('/create')
  async create(@Body() reqBody: QuizCreateDTO, @UserReq() reqUser: JwtPayload): Promise<any> {
    const { userId } = reqUser;
    const { quiz, listQuestion, listOption } = QuizTranform.toQuizEntity(reqBody as QuizDTO, userId);
    const result = await Promise.all([
      this.quizService.insert(quiz),
      this.questionService.insertMany(listQuestion),
      this.optionService.insertMany(listOption),
    ]);
    console.log(result);
    return { id: result[0].id };
    // return { quiz, listQuestion, listOption };
  }
}
