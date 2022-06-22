import { Column, OneToMany, Entity } from 'typeorm';
import { MyBaseEntity } from '@biz/base.entity';
import { Question } from '@biz/question/Question';

@Entity({ name: 'quizs' })
export class Quiz extends MyBaseEntity {
  @Column()
  content: string;

  @OneToMany(() => Question, question => question.quiz)
  questions?: Question[];
}
