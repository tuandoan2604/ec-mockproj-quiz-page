import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  salt: string;

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
}
