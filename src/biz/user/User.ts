import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  // @Unique(['username'])
  @Column()
  username: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn({
    default: new Date(),
    nullable: false,
  })
  createdAt: string;

  @UpdateDateColumn({
    default: new Date(),
    nullable: true,
  })
  updatedAt: string;

  // constructor(partial: Partial<User>) {
  //   super();
  //   Object.assign(this, partial);
  // }
}
