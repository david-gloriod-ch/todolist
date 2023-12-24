<template>
	<form class="row g-3" @submit.prevent="_submit">
		<div class="col-11">
			<label for="list-name" class="visually-hidden">Nom de la liste</label>
			<input type="text" class="form-control" id="list-name" placeholder="Nom de la Liste" v-model="_list.name">
		</div>
		<div class="col-1">
			<button type="submit" class="btn btn-primary mb-3 w-100">+</button>
		</div>
	</form>
</template>

<script setup lang="ts">
import { type tList, DefaultList } from '~/types/list';

const _list = ref<tList>({...DefaultList});
const store = useListsStore();

defaultValues();

function defaultValues()
{
	_list.value = {...DefaultList};
}

async function _submit()
{
	await store.add({..._list.value})
	.then(() => {
		defaultValues();
	});
}

</script>