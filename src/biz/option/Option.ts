import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { MyBaseEntity } from '@biz/base.entity';
import { Question } from '@biz/question/Question';

@Entity('options')
export class Option extends MyBaseEntity {
  @Column()
  content: string;

  @Column()
  isCorrect: boolean;

  @Column()
  order: number;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'questionId' })
  question?: Question;
}
