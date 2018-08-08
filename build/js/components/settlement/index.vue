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
				<legend>Resourcen</legend>
				<emp-resource-listing v-bind:resources="resources"></emp-resource-listing>
			</fieldset>
		</div>

		<div class="container">
			<fieldset class="fieldset-default">
				<legend>Gebäude</legend>
				<emp-object-listing v-bind:objects="buildings"></emp-object-listing>
				<emp-object-form v-bind:store="buildingStore" v-bind:objects="availableBuildings" v-bind:parent="id"></emp-object-form>
			</fieldset>
		</div>
	</div>
</template>

<script>
	import ObjectListing from 'components/object/listing';
	import ObjectForm from 'components/object/form';
	import ResourceListing from 'components/resource/listing';

	export default {

		// @see: https://vuejs.org/v2/guide/components.html#Local-Registration
		components: {
			'emp-object-listing': ObjectListing,
			'emp-object-form': ObjectForm,
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
				return Empire.factory.settlement.create(this.properties.qcn);
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