import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegisterDto extends LoginDto {
	@IsString({ message: 'Confirmation du mot de passe invalide' })
	@MinLength(8, { message: 'La confirmation du mot de passe doit faire minimum 8 caractères' })
	@IsNotEmpty({ message: 'Une confirmation du mot de passe est nécessaire' })
	confirm_password: string;
}
