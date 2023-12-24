import { BaseEntity } from 'src/generics/entities/base.entity';
import { ListsEntity } from 'src/lists/list.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class TasksEntity extends BaseEntity {
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

	@Column({ name: 'userId' })
	userId: string;

	@ManyToOne(
		() => ListsEntity,
		{
			eager: false,
			cascade: true,
			nullable: true,
		}
	)
	@JoinColumn({ name: 'listId', })
	list: ListsEntity;

	@Column({ name: 'listId' })
	listId: string;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	name: string;

	@Column({
		type: 'int',
		nullable: false,
	})
	status: number;
}
