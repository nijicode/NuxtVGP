type Launch = {
	details: string
	id: number
	mission_name: string
	launch_date_local: string
	rocket: {
		rocket_name: string
	}
	launch_site?: {
		site_name?: string
	}
}

export function useLaunchSortFilter(launches: Ref<Launch[]>): {
	sortCriteria: Ref<'date' | 'mission'>
	sortOrder: Ref<'asc' | 'desc'>
	rocketFilter: Ref<string>
	yearFilter: Ref<string>
	filteredAndSortedLaunches: ComputedRef<Launch[]>
} {
	// Sorting criteria (e.g., by date, mission name)
	const sortCriteria = ref<'date' | 'mission'>('date')
	const sortOrder = ref<'asc' | 'desc'>('asc')

	// Filter criteria (e.g., by rocket name or launch site)
	const rocketFilter = ref<string>('')
	const yearFilter = ref<string>('')

	// Computed property to get the filtered and sorted launches
	const filteredAndSortedLaunches = computed(() => {
		let result = [...launches.value] // Create a new array to avoid mutating the original array

		// Apply rocket name filter
		if (rocketFilter.value) {
			result = result.filter((launch) =>
				launch.rocket.rocket_name.toLowerCase().includes(rocketFilter.value.toLowerCase()),
			)
		}

		// Apply launch year filter
		if (yearFilter.value) {
			result = result.filter((launch) => {
				const launchDate = new Date(launch.launch_date_local)
				return launchDate.getFullYear().toString() === yearFilter.value
			})
		}

		// Apply sorting
		result = result.sort((a, b) => {
			let valueA, valueB

			if (sortCriteria.value === 'date') {
				valueA = new Date(a.launch_date_local).getTime()
				valueB = new Date(b.launch_date_local).getTime()
			} else {
				valueA = a.mission_name.toLowerCase()
				valueB = b.mission_name.toLowerCase()
			}

			if (sortOrder.value === 'asc') {
				return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
			} else {
				return valueA < valueB ? 1 : valueA > valueB ? -1 : 0
			}
		})

		return result // Return the new filtered and sorted array
	})

	return {
		sortCriteria,
		sortOrder,
		rocketFilter,
		yearFilter,
		filteredAndSortedLaunches,
	}
}
