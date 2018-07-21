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
	import StorageManager from '../../managers/storage/settlement';

	export default {
		data: function() {
			return {
				name: ''
			};
		},

		methods: {
			create: function() {
				var manager = new StorageManager();
						manager.store(2, {name: this.name});
						manager.get('d654-f54d-7sdf-sdf5');
				// this.$set(game.settlements, 2, {
				// 	name: this.name
				// });
			}
		}
	}
</script>