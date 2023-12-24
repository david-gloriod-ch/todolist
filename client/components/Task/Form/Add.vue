<template>
	<form class="row g-3" @submit.prevent="_submit">
		<div class="col-10 col-md-11">
			<label for="list-name" class="visually-hidden">Nom de la tâche</label>
			<input type="text" class="form-control" id="list-name" placeholder="Nom de la tâche" v-model="_task.name">
		</div>
		<button type="submit" class="btn btn-primary mb-3 col-2 col-md-1">+</button>
	</form>
</template>

<script setup lang="ts">
import type { tListWithTasks } from '~/types/list';
import { DefaultTaskCreation, type tTaskCreation } from '~/types/task';

const { list } = defineProps({
	list: {
		type: Object as PropType<tListWithTasks>,
		required: true,
	},
});

const _task = ref<tTaskCreation>({...DefaultTaskCreation});
const listStore = useListsStore();
const store = useTasksStore();

defaultValues();

function defaultValues()
{
	_task.value = {...DefaultTaskCreation};
	_task.value.listId = list.id as string;
}

async function _submit()
{
	await store.add(_task.value);
	defaultValues();
}

</script>