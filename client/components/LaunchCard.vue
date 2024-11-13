<template>
	<v-card class="mb-4 h-100">
		<iframe :src="videoSrc" frameborder="0" width="100%" height="315" loading="lazy" />
		<v-card-title>Mission: {{ missionName }}</v-card-title>
		<v-card-text>
			<v-tooltip text="Rocket Info" location="end">
				<template #activator="{ props }">
					<p>
						Rocket:
						<v-chip v-bind="props" color="orange" flat link :to="`/rockets/${launchId}`">
							{{ rocketName }}
						</v-chip>
					</p>
				</template>
			</v-tooltip>

			<p>Site: {{ launchSite || 'Unknown' }}</p>
			<v-card-actions>
				<v-tooltip :text="isFavorite ? `Remove to favorites` : `Add to favorites`" location="end">
					<template #activator="{ props }">
						<v-btn
							v-bind="props"
							:icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
							:color="isFavorite ? 'red' : 'gray'"
							@click="addOrRemoveFavorites(launchId)"
						/>
					</template>
				</v-tooltip>
				<v-spacer />
				<v-tooltip text="View details" location="start">
					<template #activator="{ props }">
						<v-btn
							v-bind="props"
							:icon="expandedLaunches.has(launchId) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
							@click="toggleDetails(launchId)"
						/>
					</template>
				</v-tooltip>
			</v-card-actions>
			<v-expand-transition>
				<div v-show="expandedLaunches.has(launchId)">
					<p>{{ launchDetails || 'No Details Provided' }}</p>
				</div>
			</v-expand-transition>
		</v-card-text>
		<v-card-subtitle>{{ launchDate }}</v-card-subtitle>
	</v-card>
</template>

<script lang="ts" setup>
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() =>
	favoritesStore.favoriteRockets.some((fav) => fav.rocket.name === rocketName),
)

interface Props {
	videoSrc: string
	missionName: string
	rocketName: string
	launchSite: string | undefined
	toggleDetails: (id: string) => void
	expandedLaunches: Set<string>
	launchId: string
	launchDate: string
	launchDetails: string | undefined
	addOrRemoveFavorites: (launchId: string) => void
}
const props = defineProps<Props>()

const {
	videoSrc,
	missionName,
	rocketName,
	launchSite,
	toggleDetails,
	expandedLaunches,
	launchDate,
	launchId,
	launchDetails,
} = props
</script>
