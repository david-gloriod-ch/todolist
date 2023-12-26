<template>
	<div>
		<header>
			<Navbar />
		</header>
		<main>
			<AlertContainer>
				<Alert
					v-for="alert in getAlerts()"
					:id="alert.id"
					:alert="alert"
				/>
			</AlertContainer>
			<NuxtPage class="container" />
		</main>
	</div>
</template>

<script setup lang="ts">

const path = useRoute().path;

if (process.client && path !== '/auth/login' && path !== '/auth/register')
{
	// const store = useAuthStore();
	// if (!store.isLogged())
	// 	useRouter().push('/login');
	await authorizedFetch('/init', {
		method: 'POST',
	})
	.catch(() => {
		useRouter().push('/auth/login');
	});
}

</script>