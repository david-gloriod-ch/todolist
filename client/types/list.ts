import type { tGeneric } from "./generic";
import type { tTask } from "./task";

export type tList = tGeneric & {
	userId: string;
	name: string;
	unstartedTasks: number;
	startedTasks: number;
	finishedTasks: number;
}

export type tListWithTasks = tList & {
	tasks: tTask[];
}

export const DefaultList: tList = {
	userId: '',
	name: '',
	unstartedTasks: 0,
	startedTasks: 0,
	finishedTasks: 0,
}

export const DefaultListWithTasks: tListWithTasks = {
	...DefaultList,
	tasks: [],
}
