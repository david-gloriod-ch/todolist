import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'debug', 'verbose', 'log'],
		cors: true,
		snapshot: true
	});
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true,
		forbidUnknownValues: true
	}));
	app.use(
		session({
			secret: process.env.SESSION_KEY,
			resave: true,
			saveUninitialized: true,
			cookie: { sameSite: 'lax' }
		}),
	);

	app.enableCors();

	await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
}
bootstrap();
