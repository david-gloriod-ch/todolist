import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ListPostDto {
	@IsString({ message: 'Nom invalide' })
	@IsNotEmpty({ message: 'Un nom est nécessaire' })
	name: string;
}
