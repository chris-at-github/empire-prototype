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
			qcn: function() {
				return Empire.configuration.settlement.default;
			}
		},

		methods: {
			create: function() {
				let settlement = Empire.factory.settlement.create(this.qcn);
						settlement.fill(this.toJson());

				let manager = new StorageManager();
						manager.store(settlement);
			},

			toJson: function() {
				return  {
					name: this.name,
					qcn: this.qcn
				}
			}
		}
	}
</script>