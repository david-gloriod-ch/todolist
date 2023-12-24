import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListsEntity } from './list.entity';
import { UsersModule } from 'src/users/users.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ListsEntity]),
		UsersModule,
		forwardRef(() => TasksModule),
	],
	providers: [ListsService],
	controllers: [ListsController],
	exports: [ListsService],
})
export class ListsModule {}
