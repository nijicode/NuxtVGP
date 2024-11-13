export default defineNuxtRouteMiddleware((to) => {
	if (!to.matched.length) {
		// If no route matched, redirect to home page
		return navigateTo('/')
	}
})
