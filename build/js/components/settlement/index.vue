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

		<div class="container" v-if="buildings.length !== 0">
			<fieldset class="fieldset-default">
				<legend>Gebäude</legend>
				<emp-object-listing v-bind:objects="buildings"></emp-object-listing>
			</fieldset>
		</div>
	</div>
</template>

<script>
	import ObjectListing from 'components/object/listing';

	export default {

		// @see: https://vuejs.org/v2/guide/components.html#Local-Registration
		components: {
			'emp-object-listing': ObjectListing
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
				return Empire.factory.settlement.create(this.properties.object);
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