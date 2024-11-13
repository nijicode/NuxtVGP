import vuetify from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	head: {
		link: [{ rel: 'shortcut icon', type: 'image/x-icon', href: './favicon.ico' }],
	},
	srcDir: 'client/',
	build: {
		target: 'static',
		css: ['vuetify/styles/global.css'],
	},
	imports: {
		dirs: ['./stores', './composables', './components'],
	},
	apollo: {
		autoImports: true,
		proxyCookies: true,
		clients: {
			default: {
				httpEndpoint: 'https://spacex-production.up.railway.app/',
			},
		},
	},
	vite: {
		plugins: [vuetify()],
		alias: {
			'@': './client',
		},
	},
	modules: [
		'@nuxtjs/apollo',
		[
			'@pinia/nuxt',
			{
				autoImports: ['defineStore', 'acceptHMRUpdate'],
			},
		],
	],
})
