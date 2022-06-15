import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { UserEntity } from "./user.entity";
import { QuestionSummaryEntity } from "./question-summary.entity";
import { QuizEntity } from "./quiz.entity";

@Entity("quiz_summary")
export class QuizSummaryEntity extends BaseEntity {
  @Column({default: "IN_PROGRESS"})
  status: string;

  @Column()
  marks?: number;

  @Column({type: "float"})
  grade?: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @ManyToOne(() => QuizEntity)
  @JoinColumn({ name: "quizId" })
  quiz?: QuizEntity;

  @OneToMany(() => QuestionSummaryEntity, (questionSummary) => questionSummary.quizSummary)
  questionsSummary?: QuestionSummaryEntity[];
}
