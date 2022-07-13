import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { QuestionEntity } from "./question.entity";

@Entity("answer")
export class AnswerEntity extends BaseEntity {
  @Column()
  name: string;
  
  @Column()
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity)
  @JoinColumn({ name: "questionId" })
  question?: QuestionEntity;
}
