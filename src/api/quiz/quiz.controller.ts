import { JwtPayload } from '@biz/auth/auth.dto';
import { OptionService } from '@biz/option/option.service';
import { QuestionService } from '@biz/question/question.service';
import { QuizService } from '@biz/quiz/quiz.service';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import _ from 'lodash';
import { UserService } from 'src/biz/user/user.service';
import { UserReq } from '../decorator/user.decorator';
import { QuizCreateDTO, QuizDTO, QuizUpdateDTO } from './quiz.dto';
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
    const { userId, role } = reqUser;
    // if (role != 'admin') throw new HttpException('only admin can create quiz', HttpStatus.FORBIDDEN);
    const { quiz, listQuestion, listOption } = QuizTranform.toQuizEntity(reqBody as QuizDTO, userId);
    const result = await Promise.all([
      this.quizService.insert(quiz),
      this.questionService.insertMany(listQuestion),
      this.optionService.insertMany(listOption),
    ]);
    // console.log(result);
    return { id: result[0].id };
  }
  // @Post('/update')
  // async update(@Body() reqBody: QuizUpdateDTO, @UserReq() reqUser: JwtPayload): Promise<any> {
  //   const { userId } = reqUser;
  //   const quizSaved = await this.quizService.getDetail(reqBody.id);
  //   const { quiz, listQuestion, listOption } = QuizTranform.toQuizEntity(reqBody as QuizDTO, userId);
  //   const;
  //   const result = await Promise.all([
  //     this.quizService.insert(quiz),
  //     this.questionService.insertMany(listQuestion),
  //     this.optionService.insertMany(listOption),
  //   ]);
  //   // console.log(result);
  //   return { id: result[0].id };
  // }
  @Get('/detail')
  async getDetail(@Query('id') id: string): Promise<QuizDTO> {
    if (!id) throw new HttpException('id is missing', HttpStatus.BAD_REQUEST);
    const quiz = await this.quizService.getDetail(id);
    if (!quiz) throw new HttpException('quiz not found', HttpStatus.NOT_FOUND);
    return QuizTranform.toQuizDTO(quiz);
  }
  @Get('/list')
  async getList(@Query('skip') skip: number, @Query('limit') limit: number): Promise<QuizDTO[]> {
    skip = _.isNil(skip) ? 0 : skip;
    limit = _.isNil(limit) ? 20 : limit;
    const quizs = await this.quizService.index(skip, limit);
    return _.map(quizs, quiz => QuizTranform.toQuizDTO(quiz));
  }
}
