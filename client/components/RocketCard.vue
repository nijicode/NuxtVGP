<template>
	<v-card class="mx-auto max-width-card" prepend-icon="mdi-rocket-launch" :subtitle="firstFlight">
		<template #title>
			<span class="font-weight-black">{{ rocketName }}</span>
		</template>
		<v-card-text class="bg-surface-light pt-4">
			<div class="flex flex-row">
				<div>
					<span class="font-weight-bold">Height:</span>
					<v-chip class="ml-3" color="orange" label>
						<span>feet: {{ heightInFeet }}</span>
					</v-chip>
					<v-chip class="ml-3" color="blue" label>
						<span>meters: {{ heightInMeters }}</span>
					</v-chip>
				</div>
				<div class="mt-2">
					<span class="font-weight-bold mt-2">Diameter:</span>
					<v-chip class="ml-3" color="orange" label>
						<span>feet: {{ diameterInFeet }}</span>
					</v-chip>
					<v-chip class="ml-3" color="blue" label>
						<span>meters: {{ diameterInMeters }}</span>
					</v-chip>
				</div>
				<p class="mt-2">{{ description }}</p>
				<v-card-actions>
					<v-chip class="mt-3" color="green" variant="flat" label>
						Number of Stages: {{ stages }}
					</v-chip>
					<v-spacer />
					<NuxtLink to="/launches"><v-btn color="blue">Go back</v-btn></NuxtLink>
				</v-card-actions>
			</div>
		</v-card-text>
	</v-card>
</template>
<script lang="ts" setup>
interface Props {
	rocketName: string
	description: string
	firstFlight: string
	heightInMeters: number
	heightInFeet: number
	diameterInFeet: number
	diameterInMeters: number
	stages: number
}
const props = defineProps<Props>()

const {
	rocketName,
	description,
	firstFlight,
	heightInFeet,
	heightInMeters,
	diameterInFeet,
	diameterInMeters,
	stages,
} = props
</script>

<style scoped>
.max-width-card {
	max-width: 1000px;
}
</style>
