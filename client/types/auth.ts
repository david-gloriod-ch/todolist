import type { tGeneric } from "./generic";

export type tLogin = tGeneric & {
	email: string;
	password: string;
}

export type tRegister = tLogin & {
	confirm_password: string;
}

export const DefaultLogin: tLogin = {
	email: process.env.DEFAULT_AUTH_EMAIL as string,
	password: process.env.DEFAULT_AUTH_PASSWORD as string,
}

export const DefaultRegister: tRegister = {
	...DefaultLogin,
	confirm_password: process.env.DEFAULT_AUTH_PASSWORD as string,
}
