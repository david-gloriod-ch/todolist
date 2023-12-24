<template>
	<div>
		<h1>Mes listes</h1>
		<ol class="list-group list-group-numbered">
			<ListItem v-for="list in store.lists" :key="list.id" :list="list" />
		</ol>
		<ListFormAdd />
	</div>
</template>

<script setup lang="ts">
const store = useListsStore();

onMounted(async () => {
	await store.findAll();
});
</script>
