<script setup>
const drawer = ref(false)
</script>
<template>
	<v-app-bar app class="bg-grey-darken-4" scroll-behavior="elevate" scroll-threshold="10">
		<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
		<v-toolbar-title>
			<NuxtLink to="/" style="text-decoration: none; color: inherit">SpaceX</NuxtLink>
		</v-toolbar-title>
		<v-spacer />
		<div class="d-none d-md-flex ga-3">
			<v-btn text to="/">Home</v-btn>
			<v-btn text to="/launches">Launches</v-btn>
			<v-btn text to="/favorites">Favorites</v-btn>
		</div>
	</v-app-bar>
	<v-navigation-drawer
		v-model="drawer"
		disable-resize-watcher
		app
		class="bg-grey-darken-4 text-center py-10"
	>
		<v-list-item link to="/" title="Home" />
		<v-list-item link to="/launches" title="Launches" />
		<v-list-item link to="/favorites" title="Favorites" />
	</v-navigation-drawer>
</template>
