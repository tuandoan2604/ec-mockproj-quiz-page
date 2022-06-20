import { Column, OneToMany } from 'typeorm';
import { MyBaseEntity } from '@biz/base.entity';
import { Question } from '@biz/question/Question';

export class Quiz extends MyBaseEntity {
  @Column()
  content: string;

  @OneToMany(() => Question, question => question.quiz)
  question?: Question[];
}
