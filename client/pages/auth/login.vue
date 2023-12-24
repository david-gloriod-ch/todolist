<template>
	<div>
		<form @submit.prevent="_submit">
			<div class="mb-3">
				<label for="email" class="form-label">Adresse mail</label>
				<input type="email" class="form-control" id="email" v-model="_login.email" required>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Mot de passe</label>
				<input type="password" class="form-control" id="password" v-model="_login.password" required>
			</div>
			<button type="submit" class="btn btn-primary">Se connecter</button>
			<NuxtLink to="/auth/register">S'inscrire</NuxtLink>
		</form>
	</div>
</template>

<script setup lang="ts">
import { type tLogin, DefaultLogin } from '~/types/auth';

const _login = ref<tLogin>({...DefaultLogin});

async function _submit()
{
	await login({..._login.value});
}

</script>