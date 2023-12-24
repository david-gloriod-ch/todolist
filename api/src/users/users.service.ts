import { ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserPostDto } from './dtos/user.post.dto';
import { BaseService } from 'src/generics/service/base.service';

@Injectable()
export class UsersService extends BaseService<UserEntity, UserEntity>{
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
	) {
		super(usersRepository);
	}

	async create(datas: UserPostDto): Promise<UserEntity> {
		if (await this.getRepository().findOneBy({ email: datas.email }))
			throw new ConflictException(`L'adresse email est déjà utilisée`);
		const user = await this.getRepository().save(datas);
		return user;
	}

	async findAll(): Promise<UserEntity[]> {
		return await this.getRepository().find();
	}

	async findOne(id: string): Promise<UserEntity | null> {
		return await this.findOneBy({ id });
	}

	async findOneBy(datas: any): Promise<UserEntity | null> {
		return await this.getRepository().findOneBy(datas);
	}

	async delete(id: string): Promise<Boolean> {
		return !!await this.getRepository().delete(id);
	}

	async remove(id: string): Promise<Boolean> {
		return !!await this.getRepository().softDelete(id);
	}

	async restore(id: string): Promise<Boolean> {
		return !!await this.getRepository().restore(id);
	}
}
