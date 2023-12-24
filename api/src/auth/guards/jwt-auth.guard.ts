import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthController } from '../auth.controller';
import { canByPass } from '../constants';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { PayloadDatas } from '../interfaces/payload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
	constructor(
		private authService: AuthService,
	) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();
		const path = request.route.path;

		if (canByPass(path))
			return true;
		return super.canActivate(context);
	}

	handleRequest(err, user, info, context) {
		if (err || !user)
			throw err || new UnauthorizedException();
		return user;
	}
}
