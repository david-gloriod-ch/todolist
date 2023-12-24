import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";

export class TaskPostDto {
	@IsUUID('4', { message: 'Liste invalide' })
	@IsNotEmpty({ message: 'Une liste est nécessaire' })
	list: string;

	@IsString({ message: 'Nom invalide' })
	@IsNotEmpty({ message: 'Un nom est nécessaire' })
	name: string;

	@IsNumber({
		allowNaN: false,
		allowInfinity: false,
	}, { message: 'Statut invalide' })
	@Min(0, { message: 'Statut invalide' })
	@Max(2, { message: 'Statut invalide' })
	@IsNotEmpty({ message: 'Un status est nécessaire' })
	status: number;
}
