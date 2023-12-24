import type { tGeneric } from "./generic";

export type tTask = tGeneric & {
	listId: string;
	name: string;
	status: eTaskStatus;
}

export type tTaskCreation = Omit<tTask, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type tTaskUpdate = Omit<tTask, 'id' | 'listId' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
	list: string;
};

export enum eTaskStatus {
	NOT_STARTED = 0,
	STARTED = 1,
	FINISH = 2,
}

export const DefaultTaskCreation: tTaskCreation = {
	listId: '',
	name: '',
	status: eTaskStatus.NOT_STARTED,
}

export const DefaultTaskUpdate: tTaskUpdate = {
	list: '',
	name: '',
	status: eTaskStatus.NOT_STARTED,
}
