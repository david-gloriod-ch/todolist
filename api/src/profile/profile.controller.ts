import { Controller, Delete, Get } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { Payload, PayloadDatas } from 'src/auth/interfaces/payload.interface';
import { UsersService } from 'src/users/users.service';

@Controller('profile')
export class ProfileController {
	constructor(
	) {}

	@Get()
	async getProfile(@User() _user: PayloadDatas)
	{
		console.log(_user);
		
		return _user;
	}
}
