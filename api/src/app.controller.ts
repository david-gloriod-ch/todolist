import { Controller, Get, Post, Req, Request, Res, Response, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Response as ExpressResponse, Request as ExpressRequest } from 'express';
import { Session as ExpressSession } from 'express-session';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Post()
	postHello(): string {
		return this.appService.getHello();
	}

	@Post('/init')
	init(
		@Req() request: ExpressRequest,
		@Res() response: ExpressResponse,
	)
	{
		response.send();
	}
}
