import _ from 'lodash';
import { IsNotEmpty, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class OptionDTO {
  id: number;
  @IsNotEmpty()
  content: string;
  order: number;
  @IsNotEmpty()
  isCorrect?: boolean;
  isChose?: boolean;
  createBy: string;
}

export class QuestionDTO {
  id: number;
  @IsNotEmpty()
  content: string;
  createBy: string;
  @IsNotEmpty()
  order: number;
  @IsNotEmpty()
  type: 'multi' | 'single';
  @IsArray()
  @IsNotEmpty()
  options: OptionDTO[];
}

export class QuizDTO {
  id: number;
  content: string;
  questions: QuestionDTO[];
  createAt?: Date;
}

export class QuizUpdateDTO extends PartialType(QuizDTO) {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  @IsArray()
  questions: QuestionDTO[];
}

export class QuizCreateDTO extends PartialType(QuizDTO) {
  @IsNotEmpty()
  content?: string;
  @IsArray()
  questions?: QuestionDTO[];
}
