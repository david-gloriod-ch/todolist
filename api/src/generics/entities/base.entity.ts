
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'varchar',
		nullable: true,
		unique: true,
	})
	signature: string;

	@CreateDateColumn({
		update: false
	})
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt?: Date;

	@Column({ default: true })
	isActive: boolean;
}
