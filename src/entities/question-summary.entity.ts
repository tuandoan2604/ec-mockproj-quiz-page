import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AnswerSummaryEntity } from "./answer-summary.entity";
import { BaseEntity } from "./base/base.entity";
import { QuizSummaryEntity } from "./quiz-summary.entity";
import { UserEntity } from "./user.entity";

@Entity("question_summary")
export class QuestionSummaryEntity extends BaseEntity {
  @Column()
  name: string;
  
  @Column()
  isMutiple: boolean;

  @Column({default: "NOT_YET_ANSWERED"})
  status: string;

  @ManyToOne(() => QuizSummaryEntity)
  @JoinColumn({ name: "quizSummaryId" })
  quizSummary?: QuizSummaryEntity;

  @OneToMany(() => AnswerSummaryEntity, (answerSummary) => answerSummary.questionSummary)
  answersSummary?: AnswerSummaryEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;
}
