import { Injectable, NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { doc } from 'prettier';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { Request } from 'express';
import { PayloadDatas } from 'src/auth/interfaces/payload.interface';

@Injectable()
export class BaseService <T, R> {
	protected request: Request;

	constructor(
		private readonly _repository: Repository<R>,
	) {}

	getRepository(): Repository<R> {
		return this._repository;
	}

	setRequest(request: Request)
	{
		this.request = request;
	}

	getRequest(): Request
	{
		return this.request;
	}

	getPayload(): PayloadDatas
	{
		return this.getRequest()['user'].datas;
	}

	getUser(): string
	{
		return this.getPayload().userId;
	}
}

// 	async getAllDatas(_sort?: any): Promise<any> {
// 		return await this.model.find({}).sort(_sort);
// 	}

// 	async getById(_id: ObjectId | string | T): Promise<T> {
// 		return await this.model.findById(_id);
// 	}

// 	getModel()
// 	{
// 		return this.model;
// 	}

// 	async getValidityId(datas: any, message: string)
// 	{
// 		if (!datas)
// 			throw new NotFoundException(message);
// 		return datas;
// 	}

// 	async backup() {
// 		return await this.getModel().find();
// 	}
// }
