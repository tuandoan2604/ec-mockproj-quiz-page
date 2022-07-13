import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    // @Column({ nullable: true })
    // code?: string;

    @Column({ nullable: true, default: 'System' })
    createdBy?: string;
    @CreateDateColumn({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate?: Date;
    @Column({ nullable: true, default: 'System' })
    lastModifiedBy?: string;
    @UpdateDateColumn({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastModifiedDate?: Date;
}
