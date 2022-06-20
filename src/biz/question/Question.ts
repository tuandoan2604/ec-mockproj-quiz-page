import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { MyBaseEntity } from '@biz/base.entity';
import { Quiz } from '@biz/quiz/Quiz';
import { Option } from '@biz/option/Option';

@Entity('questions')
export class Question extends MyBaseEntity {
  @Column()
  content: string;

  @Column()
  order: string;

  @Column()
  type: string;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quizId' })
  quiz?: Quiz;

  @OneToMany(() => Option, option => option.question)
  options?: Option[];
}
