import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { QuestionSummaryEntity } from "./question-summary.entity";
import { QuizSummaryEntity } from "./quiz-summary.entity";
import { UserEntity } from "./user.entity";

@Entity("answer_summary")
export class AnswerSummaryEntity extends BaseEntity {
  @Column()
  name: string;
  
  // @Column({
  //   select: false,
  // })
  @Column()
  isCorrect: boolean;

  @Column()
  isSelected: boolean;

  @ManyToOne(() => QuizSummaryEntity)
  @JoinColumn({ name: "quizSummaryId" })
  quizSummary?: QuizSummaryEntity;

  @ManyToOne(() => QuestionSummaryEntity)
  @JoinColumn({ name: "questionSummaryId" })
  questionSummary?: QuestionSummaryEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;
}
