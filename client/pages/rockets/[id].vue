<script setup lang="ts">
const { id } = useRoute().params

const query = gql`
	query Launch($launchId: ID!) {
		launch(id: $launchId) {
			rocket {
				rocket {
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
}>(query, { launchId: id })

const launch = computed(() => data.value?.launch?.rocket ?? null)
</script>

<template>
	<v-container v-if="launch" class="flex">
		<RocketCard
			:rocket-name="launch.rocket?.name"
			:description="launch.rocket.description"
			:first-flight="launch.rocket.first_flight"
			:height-in-meters="launch.rocket.height.meters"
			:height-in-feet="launch.rocket.height.feet"
			:diameter-in-meters="launch.rocket.diameter.meters"
			:diameter-in-feet="launch.rocket.diameter.feet"
			:stages="launch.rocket.stages"
		/>
	</v-container>
	<v-container v-else class="text-center">
		<v-progress-circular indeterminate color="primary" />
		<span>Loading rocket data...</span>
	</v-container>
</template>
