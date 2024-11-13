<template>
	<v-container>
		<h1>Welcome to Apollo System Exam</h1>
		<h4>Here I am going todo some Task utilizing the techs below:</h4>
		<h5>Nuxt 3 / Vuetify / Graphql / Pinia</h5>
		<v-container class="border mt-5 bg-grey-darken-4 rounded-lg">
			<h3>Display Launches using Pages</h3>
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
			<v-container>
				<v-row>
					<!-- Loop through each launch in the launches array -->
					<v-col v-for="launch in paginatedLaunches" :key="launch.id" cols="12" md="4">
						<v-card class="mb-4 h-100">
							<iframe
								:src="getYouTubeEmbedUrl(launch.links?.video_link)"
								frameborder="0"
								width="100%"
								height="315"
							/>
							<v-card-title>Mission: {{ launch.mission_name }}</v-card-title>
							<v-card-text>
								<p>Rocket: {{ launch.rocket.rocket_name }}</p>
								<p>Site: {{ launch.launch_site?.site_name || 'Unknown' }}</p>
								<v-card-actions>
									<p>Click arrow for details</p>
									<v-spacer />
									<v-btn
										:icon="
											expandedLaunches.has(launch.id)
												? 'mdi-chevron-up'
												: 'mdi-chevron-down'
										"
										@click="toggleDetails(launch.id)"
									/>
								</v-card-actions>
								<v-expand-transition>
									<div v-show="expandedLaunches.has(launch.id)">
										<p>{{ launch?.details || 'No Details Provided' }}</p>
									</div>
								</v-expand-transition>
							</v-card-text>
							<v-card-subtitle>{{ launch.launch_date_local }}</v-card-subtitle>
						</v-card>
					</v-col>
				</v-row>
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
	id: number
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
const expandedLaunches = ref(new Set<number>())
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
function toggleDetails(id: number) {
	if (expandedLaunches.value.has(id)) {
		expandedLaunches.value.delete(id)
	} else {
		expandedLaunches.value.add(id)
	}
}
</script>
