import { BaseEntity } from 'src/generics/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
	@Column({
		type: 'varchar',
		nullable: false,
		unique: true,
	})
	email: string;

	@Column({
		type: 'varchar',
		nullable: false,
		unique: true,
	})
	password: string;
}
