import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { BaseService } from 'src/generics/service/base.service';
import { UserEntity } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid, validate } from 'uuid';
import { Request } from 'express';
import * as CryptoJS from 'crypto-js';
import { Payload, PayloadDatas } from './interfaces/payload.interface';
import { SecurityService } from 'src/security/security.service';
import { Session as ExpressSession } from 'express-session';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

dotenv.config();

@Injectable()
export class AuthService extends BaseService<UserEntity, UserEntity> {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
		private jwtService: JwtService,
		private securityService: SecurityService,
	) {
		super(usersRepository);
	}

	async register(request: Request, datas: RegisterDto)
	{
		const { email, password, confirm_password } = datas;

		let user = await this.usersRepository.findOneBy({email});
		if (user)
			throw new ConflictException('Email déjà utilisé');

		if (password !== confirm_password)
			throw new BadRequestException('Les mots de passe ne correspondent pas');

		user = await this.usersRepository.save({email, password: await this.securityService.hashArgon2(password)});

		return this.generateToken({userId: user.id,  email}, request);
	}

	async login(request: Request, datas: LoginDto)
	{
		const { email, password } = datas;
		let user = await this.usersRepository.findOneBy({email});

		if (
			!user ||
			!await this.securityService.verifyArgon2(user.password, password)
		)
			throw new UnauthorizedException('Adresse email ou mot de passe invalide');

		return this.generateToken({userId: user.id,  email}, request);
	}

	generateToken(datas: PayloadDatas, request: Request)
	{
		return this.jwtService.sign({datas});
	}
}
