<template>
	<v-app>
		<Navbar />
		<v-main class="mt-16">
			<slot />
		</v-main>
		<Footer />
	</v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
