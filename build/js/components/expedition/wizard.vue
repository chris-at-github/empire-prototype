<template>
	<div class="expedition-wizard">
		<div class="modal" v-if="modal">
			<div class="modal--container">
				<div class="modal--header">
					<div class="modal--title">Expedition starten</div>
				</div>
				<div class="modal--body">
					NEUE EXPEDITION
				</div>
				<div class="modal--footer">
					<button class="button" v-on:click="modalClose">Abbrechen</button>
				</div>
			</div>
		</div>

		<button class="button" v-on:click="modalOpen">Expedition starten</button>
	</div>
</template>

<script>

	export default {
		data: function() {
			return {
				// rerender: false,
				modal: true
			};
		},

		props: ['settlement'],

		methods: {
			modalOpen: function() {
				this.modal = true;
			},

			modalClose: function() {
				this.modal = false;
			}
		}
	}
</script>