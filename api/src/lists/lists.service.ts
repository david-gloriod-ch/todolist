import { ConflictException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListsEntity } from './list.entity';
import { ListPostDto } from './dtos/list.post.dto';
import { BaseService } from 'src/generics/service/base.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ListsService extends BaseService<ListsEntity, ListsEntity>{
	constructor(
		@InjectRepository(ListsEntity)
		private listsRepository: Repository<ListsEntity>,
		@Inject(REQUEST)
		protected request: Request,
		@Inject(forwardRef(() => TasksService))
		private readonly tasksService: TasksService,
	) {
		super(listsRepository);
		this.setRequest(request);
	}

	async create(datas: ListPostDto): Promise<ListsEntity> {
		const list = await this.getRepository().save({
			...datas,
			user: { id: this.getUser() }
		});
		return list;
	}

	async findAll(): Promise<ListsEntity[]> {
		return await this.getRepository().find();
	}

	async findOne(id: string) {
		const tasks = await this.tasksService.getRepository().find({
			where: {
				list: { id },
				user: { id: this.getUser() }
			},
			order: {
				createdAt: 'ASC'
			}
		});
		const list = await this.findOneBy({ id });
		if (!list)
			throw new NotFoundException('Liste introuvable');

		return {
			...list,
			tasks
		};
	}

	async findOneBy(datas: any): Promise<ListsEntity | null> {
		return await this.getRepository().findOneBy(datas);
	}

	async update(id: string, datas: ListPostDto): Promise<ListsEntity | null> {
		await this.getRepository().update({id, user: {id: this.getUser() }}, datas);
		return await this.findOneBy({id, user: {id: this.getUser() }});
	}

	async checkUser(id: string, userId: string)
	{
		const list = await this.findOneBy({id, user: {id: userId}});
		if (!list)
			throw new NotFoundException('Liste introuvable');
		return list;
	}

	async delete(id: string): Promise<Boolean> {
		return !!await this.getRepository().delete({id, user: {id: this.getUser() }});
	}

	async remove(id: string): Promise<Boolean> {
		return !!await this.getRepository().softDelete(id);
	}

	async restore(id: string): Promise<Boolean> {
		return !!await this.getRepository().restore(id);
	}
}
