import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { TaskPostDto } from './dtos/task.post.dto';
import { TasksService } from './tasks.service';
import { IdPipe } from 'src/generics/pipes/id.pipe';

@Controller('tasks')
export class TasksController {
	constructor(
		@Inject(TasksService)
		private readonly service: TasksService,
	) {}

	@Get()
	findAll() {
		return this.service.findAll();
	}

	@Get(':id')
	findById(
		@Param('id', IdPipe) id: string
	) {
		return this.service.findOne(id);
	}

	@Post()
	create(
		@Body() datas: TaskPostDto
	) {
		return this.service.create(datas);
	}

	@Patch(':id')
	update(
		@Param('id', IdPipe) id: string,
		@Body() datas: TaskPostDto
	) {
		return this.service.update(id, datas);
	}

	@Delete(':id')
	remove(
		@Param('id', IdPipe) id: string
	) {
		return this.service.remove(id);
	}

	@Get(':id/restore')
	restore(
		@Param('id', IdPipe) id: string
	) {
		return this.service.restore(id);
	}
}
