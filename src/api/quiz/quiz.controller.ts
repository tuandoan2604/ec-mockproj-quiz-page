import { JwtPayload } from '@biz/auth/auth.dto';
import { OptionService } from '@biz/option/option.service';
import { QuestionService } from '@biz/question/question.service';
import { QuizService } from '@biz/quiz/quiz.service';
import { UserChooseOptionService } from '@biz/userChooseOption/userchooseoption.service';
import { UserTakeQuizService } from '@biz/userTakeQuiz/usertakequiz.service';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import _ from 'lodash';
import { UserReq } from '../decorator/user.decorator';
import { QuizCreateDTO, QuizDTO, QuizUpdateDTO, UserTakeQuizDTO } from './quiz.dto';
import { QuizTranform, UserTakeQuizTranform } from './quiz.tranform';
@Controller('/quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService,
    private readonly userTakeQuizService: UserTakeQuizService,
    private readonly userChooseOptionService: UserChooseOptionService,
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
  @Post('/take')
  async takeQuiz(@Body() reqBody: UserTakeQuizDTO, @UserReq() reqUser: JwtPayload): Promise<any> {
    const { userId } = reqUser;
    const quiz = await this.quizService.getDetail(reqBody.id);
    if (!quiz) throw new HttpException('quiz not found', HttpStatus.NOT_FOUND);
    const { userTakeQuiz, listUserChooseOption, quizDTO } = UserTakeQuizTranform.toUserTakeQuizEntity(reqBody, userId, quiz);
    const result = await Promise.all([
      this.userTakeQuizService.insert(userTakeQuiz),
      this.userChooseOptionService.insertMany(listUserChooseOption),
    ]);
    // console.log(result);
    return { totalScore: result[0].totalScore, ...quizDTO };
  }
  @Get('/listTaked')
  async getListTaked(@Query('skip') skip: number, @Query('limit') limit: number): Promise<any[]> {
    skip = _.isNil(skip) ? 0 : skip;
    limit = _.isNil(limit) ? 20 : limit;
    const userTakeQuiz = await this.userTakeQuizService.getListDetail(skip, limit);
    return _.map(userTakeQuiz, utq => {
      return {
        userTakeQuizId: utq.id,
        totalScore: utq.totalScore,
        ...utq.quiz,
      };
    });
  }
}
