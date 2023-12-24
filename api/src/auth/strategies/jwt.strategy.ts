import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Payload, PayloadDatas } from '../interfaces/payload.interface';
import { Request, Response } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private authService: AuthService,
		private configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractJwT
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_PUBLIC_KEY,
			passReqToCallback: true,
		});
	}

	private static extractJwT(request: Request) {
		const cookie = request.headers['cookie'];
		const cookies = cookie.split('; ').reduce((prev: any, current: string) => {
			if (!current)
				return prev;
			const [name, ...value] = current.split('=');
			prev[name] = value.join('=');
			return prev;
		}, {});
		const token = cookies['authorization'];
		return token;
	}

	async validate(req: Request, payload: Payload, done: Function): Promise<any> {
		// if (payload.exp < Date.now() / 1000)
		// {
		// 	const newToken = await this.authService.generateToken({
		// 		userId: payload.datas.userId,
		// 		email: payload.datas.email,
		// 	});
		// 	return {datas: payload.datas, ...newToken};
		// }
		return {datas: payload.datas};
	}
}
