<template>
	<div>
		<form @submit.prevent="_submit">
			<div class="mb-3">
				<label for="email" class="form-label">Adresse mail</label>
				<input type="email" class="form-control" id="email" v-model="_register.email" required>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Mot de passe</label>
				<input type="password" class="form-control" id="password" v-model="_register.password" required>
			</div>
			<div class="mb-3">
				<label for="confirm-password" class="form-label">Confirmation</label>
				<input type="password" class="form-control" id="confirm-password" v-model="_register.confirm_password" required>
			</div>
			<button type="submit" class="btn btn-primary">S'inscrire</button>
			<NuxtLink to="/auth/login">Se connecter</NuxtLink>
		</form>
	</div>
</template>

<script setup lang="ts">
import { type tRegister, DefaultRegister } from '~/types/auth';

const _register = ref<tRegister>({...DefaultRegister});

async function _submit()
{
	await register({..._register.value});
}

</script>