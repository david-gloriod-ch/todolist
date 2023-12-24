import { defineStore } from "pinia";
import type { tUser } from "~/types/user";

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		_userId: '',
		_email: '',
	}),
	getters: {
		userId: (state: any) => state._userId,
		email: (state: any) => state._email,
	},
	actions: {
		async fetch() {
			const user = await authorizedFetch<tUser>('/profile');
			this._userId = user.id as string;
			this._email = user.email;
		},
	},
});
