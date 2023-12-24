import { defineStore } from "pinia";
import { type tList } from "~/types/list";
import { eTaskStatus, type tTask, type tTaskCreation, type tTaskUpdate } from "~/types/task";

export const useTasksStore = defineStore({
	id: 'tasks',
	state: () => ({
		_tasks: [] as tTask[],
	}),
	getters: {
		lists: (state: any) => state._tasks,
	},
	actions: {
		async findAll() {
			this._tasks = await authorizedFetch<tTask[]>('/tasks');
		},

		async findById(id: string) {
			return await authorizedFetch<tTask>(`/tasks/${id}`);
		},

		setTasks(tasks: tTask[]) {
			this._tasks = tasks;
		},

		getTasksUnstarted() {
			return this._tasks.filter((_) => _.status === eTaskStatus.NOT_STARTED);
		},
		
		getTasksStarted() {
			return this._tasks.filter((_) => _.status === eTaskStatus.STARTED);
		},
		
		getTasksFinish() {
			return this._tasks.filter((_) => _.status === eTaskStatus.FINISH);
		},

		async add(_task: tTaskCreation) {
			const { listId, ...task } = _task;

			await authorizedFetch<tTask>('/tasks', {
				method: 'POST',
				body: {
					list: listId as string,
					...task
				},
			})
			.then((created) => {
				this._tasks.push(created);
				addAlert({
					type: 'success',
					message: 'Tâche ajoutée avec succès',
				});
			});
		},

		async update(_id: string, _task: tTaskUpdate) {
			console.log(_task);
			
			await authorizedFetch<tTask>(`/tasks/${_id}`, {
				method: 'PATCH',
				body: _task,
			})
			.then((updated) => {
				const index = this._tasks.findIndex((_) => _.id === _id);
				this._tasks[index].name = _task.name;
				this._tasks[index].status = _task.status;
				addAlert({
					type: 'success',
					message: 'Tâche modifiée avec succès',
				});
			});
		},

		async delete(_id: string) {
			await authorizedFetch<tTask>(`/tasks/${_id}`, {
				method: 'DELETE',
			})
			.then((deleted) => {
				const index = this._tasks.findIndex((_) => _.id === _id);
				this._tasks.splice(index, 1);
				addAlert({
					type: 'success',
					message: 'Tâche supprimée avec succès',
				});
			});
		},
	},
});
