<template>
	<v-app>
		<AppNavbar />
		<v-main class="mt-16">
			<slot />
		</v-main>
		<AppFooter />
	</v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
