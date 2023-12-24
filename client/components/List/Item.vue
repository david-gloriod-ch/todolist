<template>
	<li class="list list-group-item d-flex justify-content-between align-items-start" @click="goTo(`/lists/${list.id as string}`)">
		<div class="ms-2 me-auto">
			<div class="fw-bold">{{ list.name }}</div>
			Tâches non commencées: {{ list.unstartedTasks }}<br>
			Tâches commencées: {{ list.startedTasks }}<br>
			Tâches terminées: {{ list.finishedTasks }}<br>
		</div>
		<span class="badge bg-primary rounded-pill">{{ list.unstartedTasks + list.startedTasks + list.finishedTasks }}</span>
	</li>
</template>

<script setup lang="ts">

import { type tListWithTasks } from '~/types/list';

const store = useListsStore();

const { list } = defineProps({
	list: {
		type: Object as PropType<tListWithTasks>,
		required: true
	}
})

</script>

<style scoped>

.list {
	cursor: pointer;
}

</style>