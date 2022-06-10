import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base/base.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({nullable: true})
  fullName?: string;
  @Column()
  role: string;
}
