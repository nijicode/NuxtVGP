import { defineNuxtPlugin } from '#app'
import piniaPersist from 'pinia-plugin-persistedstate'
import { Pinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
	if (process.client) {
		// Ensure this runs only on the client-side
		const pinia: Pinia = nuxtApp.$pinia // Access the Pinia store injected by @pinia/nuxt
		pinia.use(piniaPersist) // Use Pinia plugin to persist state
	}
})
