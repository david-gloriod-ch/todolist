import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TasksEntity } from './task.entity';
import { TaskPostDto } from './dtos/task.post.dto';
import { BaseService } from 'src/generics/service/base.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ListsService } from 'src/lists/lists.service';

@Injectable()
export class TasksService extends BaseService<TasksEntity, TasksEntity>{
	constructor(
		@InjectRepository(TasksEntity)
		private repository: Repository<TasksEntity>,
		@Inject(REQUEST)
		protected request: Request,
		@Inject(forwardRef(() => ListsService))
		private readonly listsService: ListsService,
	) {
		super(repository);
		this.setRequest(request);
	}

	async create(datas: TaskPostDto): Promise<TasksEntity> {
		const { list , ...rest } = datas;
		const task = await this.getRepository().save({
			...rest,
			user: { id: this.getUser() },
			list: { id: list }
		});
		return task;
	}

	async findAll(): Promise<TasksEntity[]> {
		return await this.getRepository().find();
	}

	async findOne(id: string): Promise<TasksEntity | null> {
		return await this.findOneBy({ id });
	}

	async findOneBy(datas: any): Promise<TasksEntity | null> {
		return await this.getRepository().findOneBy(datas);
	}

	async update(id: string, datas: TaskPostDto): Promise<TasksEntity | null> {
		const { list , ...rest } = datas;

		const task = await this.findOneBy({id, user: {id: this.getUser() }});
		if (!task)
			throw new NotFoundException('Tâche introuvable');

		const selectedList = await this.listsService.findOneBy({ id: list });
		if (!selectedList)
			throw new NotFoundException('Liste introuvable');

		const updated = !!await this.getRepository().update({
			id,
			user: {
				id: this.getUser()
			}
		}, {...datas, list: { id: list }});

		if (!updated)
			throw new BadRequestException('Erreur lors de la mise à jour');

		const tasks = await this.getRepository().find({
			where: {
				list: { id: list },
				user: { id: this.getUser() }
			},
			select: ['status']
		});

		const status = tasks.reduce((acc, task) => {
			if (task.status === 0)
				acc['unstartedTasks']++;
			else if (task.status === 1)
				acc['startedTasks']++;
			else if (task.status === 2)
				acc['finishedTasks']++;
			return acc;
		}, {
			unstartedTasks: 0,
			startedTasks: 0,
			finishedTasks: 0
		});

		await this.listsService.getRepository().update({
			id: list,
			user: {
				id: this.getUser()
			},
		}, {
			updatedAt: new Date(),
			...status
		});

		return await this.findOneBy({id, user: {id: this.getUser() }});
	}

	async checkUser(id: string, userId: string)
	{
		const task = await this.findOneBy({id, user: {id: userId}});
		if (!task)
			throw new NotFoundException('Tâche introuvable');
		return task;
	}

	async delete(id: string): Promise<Boolean> {
		return !!await this.getRepository().delete(id);
	}

	async remove(id: string): Promise<Boolean> {
		return !!await this.getRepository().softDelete(id);
	}

	async restore(id: string): Promise<Boolean> {
		return !!await this.getRepository().restore(id);
	}
}
