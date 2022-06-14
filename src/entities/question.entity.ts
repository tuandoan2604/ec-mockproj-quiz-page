import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AnswerEntity } from "./answer.entity";
import { BaseEntity } from "./base/base.entity";
import { QuizEntity } from "./quiz.entity";

@Entity("question")
export class QuestionEntity extends BaseEntity {
  @Column()
  name: string;
  
  @Column()
  isMutiple: boolean;

  @ManyToOne(() => QuizEntity)
  @JoinColumn({ name: "quizId" })
  quiz?: QuizEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers?: AnswerEntity[];
}
