import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksEntity } from './task.entity';
import { UsersModule } from 'src/users/users.module';
import { ListsModule } from 'src/lists/lists.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([TasksEntity]),
		UsersModule,
		forwardRef(() => ListsModule),
	],
	providers: [TasksService],
	controllers: [TasksController],
	exports: [TasksService],
})
export class TasksModule {}
