import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ListPostDto } from './dtos/list.post.dto';
import { ListsService } from './lists.service';
import { IdPipe } from 'src/generics/pipes/id.pipe';

@Controller('lists')
export class ListsController {
	constructor(
		@Inject(ListsService)
		private readonly listsService: ListsService,
	) {}

	@Get()
	findAll() {
		return this.listsService.findAll();
	}

	@Get(':id')
	findById(
		@Param('id', IdPipe) id: string
	) {
		return this.listsService.findOne(id);
	}

	@Post()
	create(
		@Body() datas: ListPostDto
	) {
		return this.listsService.create(datas);
	}

	@Patch(':id')
	update(
		@Param('id', IdPipe) id: string,
		@Body() datas: ListPostDto
	) {
		return this.listsService.update(id, datas);
	}

	@Delete(':id')
	remove(
		@Param('id', IdPipe) id: string
	) {
		return this.listsService.remove(id);
	}

	@Get(':id/restore')
	restore(
		@Param('id', IdPipe) id: string
	) {
		return this.listsService.restore(id);
	}
}
