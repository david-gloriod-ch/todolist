import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ListsService } from './lists.service';
import { Request } from 'express';

@Injectable()
export class ListsMiddleware implements NestMiddleware {
	constructor(
		private readonly listsService: ListsService,
	) {}
	async use(request: Request, res: any, next: () => void) {
		this.listsService.setRequest(request);
		await this.listsService.checkUser(request.params.id, this.listsService.getUser());
		next();
	}
}
