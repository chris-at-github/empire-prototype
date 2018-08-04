<template>
	<div class="settlement-form">
		<div class="form--item">
			<label class="form--label" for="object-qcn">Typ</label>
			<select v-model="qcn" id="object-qcn" class="form--field">
				<option v-for="option in options" v-bind:value="option.value">{{option.title}}</option>
			</select>
		</div>

		<div class="form--button">
			<button class="button" v-on:click="create">Erstellen</button>
		</div>
	</div>
</template>

<script>
	import ObjectStore from 'managers/storage/object';

	/**
	 * Beispielaufruf in SettlementIndex: <emp-object-form v-bind:store="buildingStore" v-bind:objects="availableBuildings" v-bind:parent="id"></emp-object-form>
	 *
	 * @param {object} store Zielobjekt zum Speichern der Objekte z.B. Game.buildings
	 * @param {array} objects (Namespace-) Liste mit Objekten zur Auswahl
	 * @param {string} parent Eltern-Id
	 */
	export default {
		data: function() {
			return {
				qcn: ''
			};
		},

		props: ['objects', 'parent', 'store'],

		computed: {
			options: function() {
				let options = [];

				_.forEach(this.objects, function(qcn) {
					let object = Empire.factory.object.create(qcn);

					options.push({
						value: qcn,
						title: object.getName()
					});
				});

				return options;
			}
		},

		methods: {
			create: function() {
				let object = Empire.factory.object.create(this.qcn);
				object.fill(this.toJson());

				let manager = new ObjectStore();
				manager.setStorage(this.store);
				manager.store(object);
			},

			toJson: function() {
				return  {
					qcn: this.qcn,
					parent: this.parent
				}
			}
		}
	}
</script>