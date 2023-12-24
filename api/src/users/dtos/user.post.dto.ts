import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserPostDto {
	@IsEmail({}, { message: 'Email invalide' })
	@IsNotEmpty({ message: 'Un email est nécessaire' })
	email: string;
}
