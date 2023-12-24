import { MiddlewareConsumer, Module, Session } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module';
import { ProfileModule } from './profile/profile.module';

dotenv.config();

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			entities: ['dist/**/*.entity{.ts,.js}'],
			autoLoadEntities: true,
			synchronize: process.env.NODE_ENV === 'dev',
		}),
		MulterModule.register({dest: '/storage'}),
		AuthModule,
		UsersModule,
		ListsModule,
		TasksModule,
		ProfileModule,
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		// {
		// 	provide: APP_GUARD,
		// 	useClass: PermissionGuard
		// },
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: JwtInterceptor
		// },
		// {
		// 	provide: APP_GUARD,
		// 	useClass: ThrottlerGuard
		// }
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {}
}