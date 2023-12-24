import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { SecurityModule } from 'src/security/security.module';

dotenv.config();

@Module({
	imports: [
		PassportModule,
		HttpModule,
		ConfigModule,
		SecurityModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.register({
			secret: process.env.JWT_PRIVATE_KEY,
			signOptions: {
				expiresIn: '1d',
				algorithm: 'ES512',
			}
		}),
		TypeOrmModule.forFeature([
			UserEntity,
		])
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
	],
	exports: [AuthService]
})
export class AuthModule {}
