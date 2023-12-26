// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['~/assets/styles/main.scss'],
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL
		}
	},
	plugins: [
		'~/plugins/useBootstrap.client.ts',
	],
	modules: [
		'@pinia/nuxt',
		'nuxt-icon',
	],
	devServer: {
		port: parseInt(`${process.env.CLIENT_PORT}`),
	}
})
