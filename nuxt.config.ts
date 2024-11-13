import vuetify from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	head: {
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, // Correct path to favicon
		],
	},
	srcDir: 'client/',
	build: { transpile: ['vuetify'] },
	imports: { dirs: ['./stores', './composables', './components'] },
	apollo: {
		autoImports: true,
		proxyCookies: true,
		clients: {
			default: { httpEndpoint: 'https://spacex-production.up.railway.app/' },
		},
	},
	vite: {
		plugins: [vuetify()],
	},
	modules: ['@nuxtjs/apollo', ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]],
})
