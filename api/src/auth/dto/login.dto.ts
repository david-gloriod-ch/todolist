import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
	@IsEmail({}, { message: 'Email invalide' })
	@IsNotEmpty({ message: 'Un email est nécessaire' })
	email: string;

	@IsString({ message: 'Mot de passe invalide' })
	@MinLength(8, { message: 'Le mot de passe doit faire minimum 8 caractères' })
	@IsNotEmpty({ message: 'Un mot de passe est nécessaire' })
	password: string;
}
