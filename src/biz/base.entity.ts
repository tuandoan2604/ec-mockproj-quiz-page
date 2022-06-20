import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user/User';
export class MyBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userCreate?: User;
}
