<template>
	<div id="alert-container">
		<slot/>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
#alert-container {
	position: fixed;
	top: 25px;
	right: 15px;
	padding: 10px;
	padding-top: 0;
	padding-bottom: 0;
	max-width: 300px;
	width: 100%;
}

@media screen and (max-width: 768px) {
	#alert-container {
		max-width: 225px;
	}
}
</style>
