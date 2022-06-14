import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { UserEntity } from "./user.entity";
import { QuestionEntity } from "./question.entity";

@Entity("quiz")
export class QuizEntity extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column()
  name?: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "creator" })
  creator?: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions?: QuestionEntity[];
}
