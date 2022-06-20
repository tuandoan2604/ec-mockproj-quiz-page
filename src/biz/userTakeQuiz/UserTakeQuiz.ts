import { Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { MyBaseEntity } from '@biz/base.entity';
import { Quiz } from '@biz/quiz/Quiz';
import { UserChooseOption } from '@biz/userChooseOption/UserChooseOption';

@Entity('user_take_quiz')
export class UserTakeQuiz extends MyBaseEntity {
  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quizId' })
  quiz?: Quiz;

  @OneToMany(() => UserChooseOption, UCO => UCO.userTakeQuiz)
  userChooseOptions?: UserChooseOption[];
}
