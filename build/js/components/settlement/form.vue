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
	import StorageManager from 'managers/storage/settlement';

	export default {
		data: function() {
			return {
				name: ''
			};
		},

		computed: {
			object: function() {
				return Empire.configuration.settlement.default;
			}
		},

		methods: {
			create: function() {
				var manager = new StorageManager();
						manager.store(this.toJson());
			},

			toJson: function() {
				return  {
					name: this.name,
					object: this.object
				}
			}
		}
	}
</script>