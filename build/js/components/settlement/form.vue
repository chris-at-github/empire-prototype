<template>
	<div class="settlement-form">
		<div class="form--item">
			<label class="form--label" for="settlement-name">Name</label>
			<input v-model="name" type="text" id="settlement-name" class="form--field" value="">
		</div>

		<div class="form--button">
			<button class="button" v-on:click="create">Erstellen</button>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				name: ''
			};
		},

		methods: {
			create: function() {
				var manager = new Empire.StorageManager();
						manager.set(2, {name: this.name});
				// this.$set(game.settlements, 2, {
				// 	name: this.name
				// });
			}
		}
	}
</script>