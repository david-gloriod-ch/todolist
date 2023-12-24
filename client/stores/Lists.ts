import { defineStore } from "pinia";
import type { tList, tListWithTasks } from "~/types/list";
import type { tTask, tTaskCreation } from "~/types/task";

export const useListsStore = defineStore({
	id: 'lists',
	state: () => ({
		_lists: [] as tList[],
	}),
	getters: {
		lists: (state: any) => state._lists,
	},
	actions: {
		async findAll() {
			this._lists = await authorizedFetch<tListWithTasks[]>('/lists');
		},

		async findById(id: string) {
			return await authorizedFetch<tListWithTasks>(`/lists/${id}`);
		},

		async getTasksUnstarted(listId: string) {
			const list = await this.findById(listId)
			if (!list)
				throw new Error('Aucune liste trouvée');
			return list?.tasks.filter((_) => _.status === 0);
		},

		async getTasksStarted(listId: string) {
			const list = await this.findById(listId)
			if (!list)
				throw new Error('Aucune liste trouvée');
			return list?.tasks.filter((_) => _.status === 1);
		},

		async getTasksFinish(listId: string) {
			const list = await this.findById(listId)
			if (!list)
				throw new Error('Aucune liste trouvée');
			return list?.tasks.filter((_) => _.status === 2);
		},

		async add(_list: tList) {
			const created = await authorizedFetch<tList>('/lists', {
				method: 'POST',
				body: {
					name: _list.name,
				},
			});
			const list = {
				...created,
				tasks: []
			};
			this._lists.push({...list});
			addAlert({
				type: 'success',
				message: 'Liste ajoutée avec succès',
			});
		},

		delete(_list: tList | null) {
			if (!_list)
				throw new Error('Aucune liste sélectionnée');

			const index = this._lists.findIndex((_) => _.id === _list!.id);
			this._lists.splice(index, 1);
			addAlert({
				type: 'success',
				message: 'Liste supprimée avec succès',
			});
		},

		async update(_list: tList | null) {
			if (!_list)
				throw new Error('Aucune liste sélectionnée');
			const index = this._lists.findIndex((_) => _.id === _list!.id);
			const updated = await authorizedFetch<tList>(`/lists/${_list!.id}`, {
				method: 'PATCH',
				body: {
					name: _list!.name,
				},
			});
			this._lists.splice(index, 1, {..._list});
			addAlert({
				type: 'success',
				message: 'Liste modifiée avec succès',
			});
		},

		async findTaskById(_listId: string, taskId: string) {
			const list = await this.findById(_listId)
			if (!list)
				throw new Error('Aucune liste trouvée');
			return list.tasks.find((_) => _.id === taskId);
		},

		async addTask(_list: tList | string, _task: tTaskCreation) {
			const list = await this.findById(typeof _list === 'string' ? _list : _list.id as string)
			if (!list)
				throw new Error('Aucune liste trouvée');
			await authorizedFetch<tTask>(`/tasks`, {
				method: 'POST',
				body: {
					name: _task.name,
					status: 0,
					list: list.id,
				}
			})
			.then((created) => {
				addAlert({
					type: 'success',
					message: 'Tâche ajoutée avec succès',
				});
			});
		},

		async updateTask(_list: tList | string, _task: tTask) {
			const list = await this.findById(typeof _list === 'string' ? _list : _list.id as string)
			if (!list)
				throw new Error('Aucune liste trouvée');
			await authorizedFetch<tTask>(`/tasks/${_task.id}`, {
				method: 'PATCH',
				body: {
					..._task,
					listId: list.id,
				}
			})
			.then((updated) => {
				addAlert({
					type: 'success',
					message: 'Tâche modifiée avec succès',
				});
			});
		},
	},
});
