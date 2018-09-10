<template>
	<div class="screen screen--settlement object settlement" v-if="active">
		<div class="container">
			<header class="object--header">
				<div class="object--title">{{name}}</div>
			</header>

			<div class="object--actions">
				<ul>
					<li>
						<button v-on:click="close" class="button">Schliessen</button>
					</li>
				</ul>
			</div>
		</div>

		<div class="container">
			<fieldset class="fieldset-default">
				<legend>Lager</legend>

				<div class="properties">
					<div class="property">
						<div class="property--title">maximale Lagerkapazität:</div>
						<div class="property--value">{{storageCapacity}}</div>
					</div>
				</div>

				<hr>

				<emp-resource-listing v-bind:resources="resources"></emp-resource-listing>
			</fieldset>
		</div>

		<div class="container">
			<fieldset class="fieldset-default">
				<legend>Gebäude</legend>

				<div class="properties">
					<div class="property">
						<div class="property--title">Bauplätze:</div>
						<div class="property--value">gesamt: {{buildingSite.total}} / verfügbar: {{buildingSite.available}}</div>
					</div>
				</div>

				<hr>

				<emp-object-listing v-bind:objects="buildings"></emp-object-listing>

				<hr>

				<emp-object-wizard v-bind:store="buildingStore" v-bind:objects="availableBuildings" v-bind:parent="id"></emp-object-wizard>
			</fieldset>
		</div>

		<div class="container">
			<fieldset class="fieldset-default">
				<legend>Einwohner</legend>

				<div class="properties">
					<div class="property">
						<div class="property--title">Einwohlerzahl:</div>
						<div class="property--value">{{unitCount}}</div>
					</div>

					<div class="property">
						<div class="property--title">Kapazität:</div>
						<div class="property--value">gesamt: {{unitCapacity.total}} / verfügbar: {{unitCapacity.available}}</div>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
</template>

<script>
	import ObjectListing from 'components/object/listing';
	import ObjectWizard from 'components/object/wizard';
	import ResourceListing from 'components/resource/listing';

	export default {

		// @see: https://vuejs.org/v2/guide/components.html#Local-Registration
		components: {
			'emp-object-listing': ObjectListing,
			'emp-object-wizard': ObjectWizard,
			'emp-resource-listing': ResourceListing
		},

		data: function() {
			return {};
		},

		props: ['screen', 'activate'],

		computed: {
			active: function() {
				if(this.screen === Empire.manager.screen.SETTLEMENT && this.activate.settlement !== null) {
					return true;
				}

				return false;
			},

			properties: function() {
				if(_.isUndefined(Game.settlements[this.activate.settlement]) === false) {
					return Game.settlements[this.activate.settlement];
				}
			},

			object: function() {
				let object = Empire.factory.settlement.create(this.properties.qcn);
						object.fill(this.properties);

				return object;
			},

			id: function() {
				return this.properties.id;
			},

			name: function() {
				return this.properties.name;
			},

			buildings: function() {
				let settlement = this;

				return _.filter(Game.buildings, function(building) {
					if(building.parent === settlement.properties.id) {
						return building;
					}
				});
			},

			availableBuildings: function() {
				return Empire.configuration.object.buildings;
			},

			buildingStore: function() {
				return Game.buildings;
			},

			resources: function() {
				return this.properties.resources;
			},

			storageCapacity: function() {
				return this.object.getStorageCapacity();
			},

			buildingSite: function() {
				return {
					total: this.object.buildingSite,
					available: this.object.getAvailableBuildingSite()
				};
			},

			unitCount: function() {
				return this.object.getUnitCount();
			},

			unitCapacity: function() {
				return {
					total: this.object.getUnitCapacity(),
					available: this.object.getAvailableUnits()
				}
			}
		},

		methods: {
			close: function() {
				Empire.manager.screen.activate(Empire.manager.screen.WORLD);
				Empire.manager.activate.deactivateSettlement();
			}
		}
	}
</script>