import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { QuestionSummaryEntity } from "./question-summary.entity";

@Entity("answer_summary")
export class AnswerSummaryEntity extends BaseEntity {
  @Column()
  name: string;
  
  @Column()
  isCorrect: boolean;

  @Column()
  isSelected: boolean;

  @ManyToOne(() => QuestionSummaryEntity)
  @JoinColumn({ name: "questionSummaryId" })
  questionSummary?: QuestionSummaryEntity;
}
