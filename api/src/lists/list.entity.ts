import { BaseEntity } from 'src/generics/entities/base.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ListsEntity extends BaseEntity {
	@ManyToOne(
		() => UserEntity,
		{
			eager: false,
			cascade: true,
			nullable: true,
		}
	)
	@JoinColumn({ name: 'userId', })
	user: UserEntity;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	name: string;

	@Column({
		type: 'int',
		nullable: false,
		default: 0,
	})
	unstartedTasks: number;

	@Column({
		type: 'int',
		nullable: false,
		default: 0,
	})
	startedTasks: number;

	@Column({
		type: 'int',
		nullable: false,
		default: 0,
	})
	finishedTasks: number;
}
