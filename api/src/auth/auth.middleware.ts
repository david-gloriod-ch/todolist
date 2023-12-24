import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Payload, PayloadDatas } from './interfaces/payload.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: () => void) {
		next();
	}
}
