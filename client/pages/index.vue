<template>
	<v-container class="border">
		<h1>Welcome to Apollo System Exam</h1>
		<h4>Here I am going todo some Task utilizing the techs below:</h4>
		<h5>Nuxt 3 / Vuetify / Graphql / Pinia</h5>
		<v-container class="border mt-5 bg-grey-darken-4 rounded-lg">
			<h3>Display Launches using Pages</h3>
			<!-- <pre>{{ launches }}</pre> -->
			<v-container>
				<v-row>
					<!-- Loop through each launch in the launches array -->
					<v-col v-for="launch in launches" :key="launch.id" cols="12" md="4">
						<v-card class="mb-4 h-100" link>
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
		}
	}
`
const { data } = useAsyncQuery<{
	launches: {
		mission: String
		id: number
		rocket: {
			rocket_name: String
		}
		details: String
		launch_date_local: String
		launch_site: {
			site_name: String
		}
	}[]
}>(query)
const launches = computed(() => data.value?.launches ?? [])
const expandedLaunches = ref(new Set<number>())

// Toggle the visibility of details for a specific launch
function toggleDetails(id: number) {
	if (expandedLaunches.value.has(id)) {
		expandedLaunches.value.delete(id)
	} else {
		expandedLaunches.value.add(id)
	}
}
</script>
