import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Request } from 'express';

@Injectable()
export class TasksMiddleware implements NestMiddleware {
	constructor(
		private readonly service: TasksService,
	) {}
	async use(request: Request, res: any, next: () => void) {
		this.service.setRequest(request);
		await this.service.checkUser(request.params.id, this.service.getUser());
		next();
	}
}
