import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { QuizEntity } from "./quiz.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;
  @Column({
    type: "varchar",
    select: false,
  })
  password: string;
  @Column({ nullable: true })
  fullName?: string;
  @Column()
  role: string;

  @OneToMany(() => QuizEntity, (quiz) => quiz.creator)
  quizs?: QuizEntity[];
}
