<template>
	<div>
		<div class="alert" :class="`alert-${alert.type}`">
			<div class="alert-title-container alert-padding-container" :class="`alert-${alert.type}-title`">
				<span class="alert-title-text">{{ getTitle(alert.type) }}</span>
				<span class="close-btn" @click="removeAlert(alert.id as string)">&times;</span>
			</div>
			<div class="alert-message-container alert-padding-container">
				<p class="alert-message-text">{{ alert.message }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { tAlert } from '~/types/alert';


const { alert } = defineProps({
	alert: {
		type: Object as PropType<tAlert>,
		required: true,
	}
});

function getTitle(_type: string)
{
	switch (_type)
	{
		case 'success':
			return 'Succès';
		case 'danger':
			return 'Erreur';
		case 'warning':
			return 'Attention';
		case 'info':
			return 'Information';
		default:
			return 'Information';
	}
}

setTimeout(() => {
	if (alert.id)
		removeAlert(alert.id as string);
}, alert.time ?? 5000);

</script>

<style scoped>

.alert {
	border: 1px solid black;
	width: 250px;
	padding: 0;
}

.alert-success-title {
	background-color: #28a745;
}

.alert-danger-title {
	background-color: #dc3545;
}

.alert-warning-title {
	background-color: #ffc107;
}

.alert-info-title {
	background-color: #17a2b8;
}

.alert-title-container {
	border-bottom: 1px solid black;
	width: 100%;
	display: flex;
	justify-content: space-between;
}

.alert-title-text {
	color: white;
	font-weight: bold;
}

.alert-title-text, .alert-message-text {
	padding: 0;
	margin: 0;
}

.alert-padding-container {
	padding: 2.5px 10px 2.5px 10px;
}

.alert-message-text {
	text-wrap: wrap;
}

.close-btn {
	cursor: pointer;
}

</style>