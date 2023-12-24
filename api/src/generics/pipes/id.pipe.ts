import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class IdPipe implements PipeTransform {
	transform(id: string, metadata: ArgumentMetadata) {
		if (!validate(id))
		{
			throw new NotFoundException({
				status: 404,
				message: 'Élément introuvable',
			})
		}
		return id;
	}
}
