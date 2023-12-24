<template>
	<li class="list-group-item">
		<div class="row">
			<div class="col-12 col-md-3">
				<select class="form-select" aria-label="Default select example" v-model="task.status" @change="update">
					<option selected disabled>Sélectionner un status</option>
					<option value="0">Non commencée</option>
					<option value="1">Commencée</option>
					<option value="2">Finis</option>
				</select>
			</div>
			<div class="col-12 col-md-9">
				<label class="form-check-label" contenteditable="true" @keydown.enter.prevent="update_name" :id="`task-${task.id}`">{{ task.name }}</label>
			</div>
		</div>
	</li>
</template>

<script setup lang="ts">
import type { tTask } from '~/types/task';

const { task } = defineProps({
	task: {
		type: Object as PropType<tTask>,
		required: true
	}
});

const listStore = useListsStore();
const store = useTasksStore();

async function update()
{
	const taskUpdating = {
		name: task.name,
		status: Number(task.status),
		list: task.listId,
	}
	store.update(task.id as string, taskUpdating);
}

async function update_name()
{
	const taskName = document.querySelector<HTMLLabelElement>(`#task-${task.id}`);
	if (!taskName)
		return;

	task.name = taskName.innerText;
	const taskUpdating = {
		name: task.name,
		status: Number(task.status),
		list: task.listId,
	}
	if (taskName.innerText.length === 0)
		await store.delete(task.id as string);
	else
		await store.update(task.id as string, taskUpdating);

	taskName.blur();
}

</script>

<style scoped>

label {
	width: 100%;
}

</style>