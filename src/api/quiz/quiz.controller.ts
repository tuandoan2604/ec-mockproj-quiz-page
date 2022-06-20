import { JwtPayload } from '@biz/auth/auth.dto';
import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from 'src/biz/user/user.service';
import { UserReq } from '../decorator/user.decorator';
import { QuizDTO } from './quiz.dto';
@Controller('/quiz')
export class QuizController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')
  async register(@Body() reqBody: QuizDTO, @UserReq() reqUser: JwtPayload): Promise<any> {
    // const { username } = reqUser;
    // const;
    // return user;
  }
}
