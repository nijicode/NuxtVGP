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

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		favorites: [] as Rocket[],
	}),
	actions: {
		addFavorite(rocket: Rocket) {
			if (!this.favorites.find((item) => item.rocket.id === rocket.rocket.id)) {
				this.favorites.push(rocket)
			}
		},
		removeFavorite(rocketId: string) {
			this.favorites = this.favorites.filter((item) => item.rocket.id !== rocketId)
		},
		clearFavorites() {
			this.favorites = []
		},
	},
	getters: {
		favoriteRockets: (state) => state.favorites,
	},
	persist: true,
})
