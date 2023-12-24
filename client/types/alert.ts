export type tAlert = {
	id?: string;
	type: 'success' | 'error' | 'warning' | 'info' | 'danger';
	message: string;
	time?: number;
}
