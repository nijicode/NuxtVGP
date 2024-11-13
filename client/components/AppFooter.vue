<template>
	<v-footer
		class="bg-grey-darken-4 text-center d-flex flex-column justify-space-between py-10"
		style="max-height: fit-content"
	>
		<div>
			<v-btn
				v-for="icon in icons"
				:key="icon"
				:icon="icon"
				class="mx-4"
				variant="text"
				target="_blank"
				:href="getLink(icon)"
			/>
		</div>

		<div class="pt-0">
			Hi! I am an aspiring full-stack web developer with a strong passion for coding. This is my Nuxt
			website for the Apollo Systems Exam. Although I’m not yet familiar with Vue/Nuxt, I did my best to
			complete the exam and learn as much as I could in the process. Feel free to check out my socials
			above for more info about me.
		</div>

		<v-divider />

		<div>
			© {{ new Date().getFullYear() }}
			<strong>Aldous Estacio</strong>
		</div>
	</v-footer>
</template>

<script>
export default {
	data() {
		return {
			icons: ['mdi-facebook', 'mdi-github', 'mdi-folder-account', 'mdi-certificate'], // Your icon list
		}
	},
	methods: {
		getLink(icon) {
			// Example logic to return links based on icons
			const links = {
				'mdi-facebook': 'https://www.facebook.com/aldous.estacio.5/',
				'mdi-github': 'https://github.com/nijicode',
				'mdi-folder-account': 'https://nijicode.github.io/aldous/',
				'mdi-certificate':
					'https://www.freecodecamp.org/certification/Programmer_Aldous/responsive-web-design',
			}
			return links[icon] || '#' // Default to '#' if no link is found
		},
	},
}
</script>
