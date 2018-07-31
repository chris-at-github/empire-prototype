<template>
	<div class="settlement-form">
		<div class="form--item">
			<label class="form--label" for="object-type">Typ</label>
			<select v-model="type" type="text" id="object-type" class="form--field">
				<option v-for="option in options" v-bind:value="option.value">{{option.title}}</option>
			</select>
		</div>

		<div class="form--button">
			<button class="button" v-on:click="create">Erstellen</button>
		</div>
	</div>
</template>

<script>
	// import StorageManager from 'managers/storage/settlement';

	export default {
		data: function() {
			return {
				type: ''
			};
		},

		props: ['objects'],

		computed: {
			options: function() {
				let options = [];

				_.forEach(this.objects, function(namespace) {
					let object = Empire.factory.object.create(namespace);

					options.push({
						value: namespace,
						title: object.getName()
					});
				});

				return options;
			}
		},

		methods: {
			create: function() {
				// var manager = new StorageManager();
				// 		manager.store(this.toJson());
			},

			toJson: function() {
				return  {
					type: this.type
				}
			}
		}
	}
</script>