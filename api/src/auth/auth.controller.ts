import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Req, Request, Res, Response, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { IdPipe } from 'src/generics/pipes/id.pipe';
import { User } from './decorators/user.decorator';
import { PayloadDatas } from './interfaces/payload.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Session as ExpressSession } from 'express-session';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	)
	{}

	@Post('register')
	async register(
		@Request() request: ExpressRequest,
		@Response() response: ExpressResponse,
		@Body() datas: RegisterDto
	)
	{
		const access_token = await this.authService.register(request, datas);
		response.cookie('authorization', access_token, {httpOnly: true});
		response.send();
	}

	@Post('login')
	async login(
		@Request() request: ExpressRequest,
		@Response() response: ExpressResponse,
		@Body() datas: LoginDto
	)
	{
		const access_token = await this.authService.login(request, datas);
		response.cookie('authorization', access_token, {httpOnly: true});
		response.send();
	}

	@Delete('disconnect')
	async disconnect(
		@Request() request: ExpressRequest,
		@Response() response: ExpressResponse
	)
	{
		response.cookie('authorization', "", {httpOnly: true});
		response.send();
	}
}
