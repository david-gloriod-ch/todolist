import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { UserPostDto } from './dtos/user.post.dto';
import { UsersService } from './users.service';
import { IdPipe } from 'src/generics/pipes/id.pipe';

@Controller('users')
export class UsersController {
	constructor(
		@Inject(UsersService)
		private readonly usersService: UsersService,
	) {}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findById(
		@Param('id', IdPipe) id: string
	) {
		return this.usersService.findOne(id);
	}

	@Post()
	create(
		@Body() datas: UserPostDto
	) {
		return this.usersService.create(datas);
	}

	@Delete(':id')
	remove(
		@Param('id', IdPipe) id: string
	) {
		return this.usersService.remove(id);
	}

	@Get(':id/restore')
	restore(
		@Param('id', IdPipe) id: string
	) {
		return this.usersService.restore(id);
	}
}
