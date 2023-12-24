import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserPostDto {
	@IsEmail({}, { message: 'Email invalide' })
	@IsNotEmpty({ message: 'Un email est nécessaire' })
	email: string;

	@IsUUID('4', { message: 'UUID invalide' })
	@IsNotEmpty({ message: 'Un UUID est nécessaire' })
	uuid: string;
}
