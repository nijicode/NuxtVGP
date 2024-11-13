<template>
	<v-container>
		<h2>SpaceX Launches</h2>
		<v-container class="border mt-5 bg-grey-darken-4 rounded-lg">
			<!-- <pre>{{ launches }}</pre> -->
			<v-container class="d-flex align-center justify-space-between">
				<!-- Filter Inputs -->
				<v-text-field v-model="rocketFilter" label="Filter by Rocket" class="mr-4" />
				<v-text-field v-model="yearFilter" label="Filter by Year" class="mr-4" />
				<!-- Sort Controls -->
				<v-select v-model="sortCriteria" :items="['date', 'mission']" label="Sort by" class="mr-4" />
				<v-select v-model="sortOrder" :items="['asc', 'desc']" label="Order" />
			</v-container>
			<div class="text-center">
				<v-row class="justify-center">
					<v-col cols="6">
						<v-pagination
							v-model="page"
							:length="totalPages"
							next-icon="mdi-menu-right"
							prev-icon="mdi-menu-left"
						/>
					</v-col>
				</v-row>
			</div>
			<v-container v-if="paginatedLaunches.length">
				<v-row>
					<!-- Loop through each launch in the launches array -->
					<v-col v-for="launch in paginatedLaunches" :key="launch.id" cols="12" md="4">
						<LaunchCard
							:video-src="getYouTubeEmbedUrl(launch.links?.video_link)"
							:mission-name="launch.mission_name"
							:launch-site="launch.launch_site?.site_name"
							:toggle-details="toggleDetails"
							:launch-id="launch.id"
							:launch-date="launch.launch_date_local"
							:launch-details="launch.details"
							:rocket-name="launch.rocket.rocket_name"
							:expanded-launches="expandedLaunches"
							:add-or-remove-favorites="addOrRemoveFavorites"
						/>
					</v-col>
				</v-row>
			</v-container>
			<v-container v-else class="text-center">
				<h1>No Launch Found.</h1>
			</v-container>
		</v-container>
	</v-container>
</template>
<script lang="ts" setup>
const query = gql`
	query getLaunches {
		launches {
			mission_name
			id
			rocket {
				rocket_name
			}
			details
			launch_date_local
			launch_site {
				site_name
			}
			links {
				video_link
			}
		}
	}
`
interface Launch {
	mission_name: string
	id: string
	rocket: {
		rocket_name: string
	}
	details: string
	launch_date_local: string
	launch_site: {
		site_name: string
	}
	links: {
		video_link: string
	}
}
const { data } = useAsyncQuery<{
	launches: Launch[]
}>(query)
const launches = computed(() => data.value?.launches ?? [])
const expandedLaunches = ref(new Set<string>())
const page = ref(1)
const launchesPerPage = 9

// Use the sorting and filtering composable
const { sortCriteria, sortOrder, rocketFilter, yearFilter, filteredAndSortedLaunches } =
	useLaunchSortFilter(launches)

// Calculate the total number of pages based on the filtered and sorted launches
const totalPages = computed(() => Math.ceil(filteredAndSortedLaunches.value.length / launchesPerPage))

// Slice the launches array to only display launches for the current page
const paginatedLaunches = computed(() => {
	const start = (page.value - 1) * launchesPerPage
	const end = start + launchesPerPage
	return filteredAndSortedLaunches.value.slice(start, end)
})

// Method to extract video ID and return the YouTube embed URL
function getYouTubeEmbedUrl(url: string | undefined): string | undefined {
	const videoId = url?.split('v=')[1]
	return `https://www.youtube.com/embed/${videoId}`
}

// Toggle the visibility of details for a specific launch
function toggleDetails(id: string) {
	if (expandedLaunches.value.has(id)) {
		expandedLaunches.value.delete(id)
	} else {
		expandedLaunches.value.add(id)
	}
}

const favoritesStore = useFavoritesStore()

function addOrRemoveFavorites(launchId: string) {
	if (launchId) {
		const query = gql`
			query Launch($launchId: ID!) {
				launch(id: $launchId) {
					rocket {
						rocket {
							id
							name
							description
							first_flight
							height {
								feet
								meters
							}
							diameter {
								feet
								meters
							}
							stages
						}
					}
				}
			}
		`
		interface Rocket {
			rocket: {
				id: string
				name: string
				description: string
				first_flight: string
				height: {
					feet: number
					meters: number
				}
				diameter: {
					feet: number
					meters: number
				}
				stages: number
			}
		}

		const { data } = useAsyncQuery<{
			launch: { rocket: Rocket }
		}>(query, { launchId })

		const launch = computed(() => data.value?.launch?.rocket ?? null)

		if (launch.value) {
			if (favoritesStore.favoriteRockets.some((fav) => fav.rocket.id === launch.value.rocket.id)) {
				favoritesStore.removeFavorite(launch.value.rocket.id)
			} else {
				favoritesStore.addFavorite(launch.value)
			}
		}
	}
	console.log([...favoritesStore.favoriteRockets])
}
</script>
