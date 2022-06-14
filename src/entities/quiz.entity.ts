import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { UserEntity } from "./user.entity";

@Entity("quiz")
export class QuizEntity extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column()
  name?: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "creator" })
  user?: UserEntity;
}
