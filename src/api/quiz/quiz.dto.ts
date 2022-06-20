import { IsBoolean, IsEmail, IsNotEmpty, Length, Validate, IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '@biz/user/User';

export class Option {
  id: number;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  order: number;
  @IsNotEmpty()
  isCorret: string;
  isChose: string;
  createBy: string;
}

export class QuestionDTO {
  id: number;
  @IsNotEmpty()
  content: string;
  createBy: string;
  @IsNotEmpty()
  order: number;
  options: Array<Option>;
  public toQuestionEntity() {
    const user = new User();
    return user;
  }
}

export class QuizDTO {
  id: number;
  content: string;
  questions: Array<QuestionDTO>;

  public toQuizEntity(salt, role) {
    const user = new User();
    // user.username = this.username;
    // user.password = this.password;
    user.salt = salt;
    user.role = role;
    return user;
  }
}

export class QuizUpdateDTO extends PartialType(QuizDTO) {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  questions: Array<QuestionDTO>;
}

export class QuizCreateDTO extends PartialType(QuizDTO) {
  @IsNotEmpty()
  content?: string;
}
