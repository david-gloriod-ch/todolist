<template>
	<div>
		<div v-if="list">
			<h1 class="row list-name">
				<span contenteditable="true" @keydown.enter.prevent="update" @blur="_cancel" @focus="_focus" id="list-name" :class="`col-${is_editing ? '12' : '6'} col-md-${is_editing ? '10' : '11'}`">{{ list.name }}</span>
				<button
					v-if="is_editing"
					type="button"
					class="btn btn-danger col-6 col-md-1"
					@click="_delete"
				>
					Supprimer
				</button>
				<button
					type="button"
					class="btn btn-primary col-6 col-md-1"
					@click="_edit"
				>
					Editer
				</button>
			</h1>
			<ul class="list-group">
				<TaskItem v-for="task in list.tasks" :key="task.id" :task="task" />
			</ul>
			<span>Pour supprimer une tâche, veuillez simplement supprimer son titre</span>
			<TaskFormAdd
				:list="list"
			/>
		</div>
		<div v-else>
			Chargement en cours...
		</div>
	</div>
</template>

<script setup lang="ts">
import { type tListWithTasks } from '~/types/list';

const id = useRoute().params.id;
const store = useListsStore();
const taskStore = useTasksStore();
const list = ref<tListWithTasks | null>();
const is_editing = ref<boolean>(false);

list.value = await store.findById(id as string);
if (!list.value)
	useRouter().push('/lists/404');
else
	taskStore.setTasks(list.value.tasks);

function update()
{
	const title = document.querySelector<HTMLHeadingElement>('#list-name');
	if (!title)
		return;
	list.value!.name = title.innerText;
	store.update(list.value!);
	title.blur();
	setTimeout(() => {
		is_editing.value = false;
	}, 100);
}

function _edit()
{
	const title = document.querySelector<HTMLHeadingElement>('#list-name');
	if (!title)
		return;
	title.focus();
}

function _delete()
{
	store.delete(list.value!);
	useRouter().push('/');
}

function _cancel()
{
	setTimeout(() => {
		is_editing.value = false;
	}, 100);
	const title = document.querySelector<HTMLHeadingElement>('#list-name');
	if (!title)
		return;
	title.innerText = list.value!.name;
}

function _focus()
{
	is_editing.value = true;
}

</script>

<style scoped>

.list-name {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

</style>