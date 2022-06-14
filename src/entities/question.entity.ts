import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
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
}
