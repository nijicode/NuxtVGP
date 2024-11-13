<template>
	<v-container>
		<v-btn color="red" class="mb-4" @click="clearFavorites">Clear Favorites</v-btn>
		<v-row>
			<v-col v-for="rocket in favoritesStore.favoriteRockets" :key="rocket.id" cols="12" md="4">
				<RocketCard
					:rocket-name="rocket.rocket.name"
					:description="rocket.rocket.description"
					:first-flight="rocket.rocket.first_flight"
					:height-in-meters="rocket.rocket.height.meters"
					:height-in-feet="rocket.rocket.height.feet"
					:diameter-in-meters="rocket.rocket.diameter.meters"
					:diameter-in-feet="rocket.rocket.diameter.feet"
					:stages="rocket.rocket.stages"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>
<script setup>
const favoritesStore = useFavoritesStore()
function clearFavorites() {
	favoritesStore.clearFavorites()
}
</script>
