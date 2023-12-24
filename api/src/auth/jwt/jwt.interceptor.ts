import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { PayloadDatas } from '../interfaces/payload.interface';
import { AppController } from 'src/app.controller';
import { AuthController } from '../auth.controller';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const user = context.switchToHttp().getRequest<PayloadDatas>();
		return next.handle();
	}
}
