import type { tGeneric } from "./generic";

export type tUser = tGeneric & {
	email: string;
}

export const DefaultUser: tUser = {
	email: '',
}
