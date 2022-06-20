import { Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { MyBaseEntity } from '@biz/base.entity';
import { UserTakeQuiz } from '@biz/userTakeQuiz/UserTakeQuiz';
import { Option } from '@biz/option/Option';

@Entity('user_choose_option')
export class UserChooseOption extends MyBaseEntity {
  @ManyToOne(() => Option)
  @JoinColumn({ name: 'optionId' })
  option?: Option;

  @ManyToOne(() => UserTakeQuiz)
  @JoinColumn({ name: 'userTakeQuizId' })
  userTakeQuiz?: UserTakeQuiz;
}
