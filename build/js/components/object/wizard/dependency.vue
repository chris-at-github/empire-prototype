<template>
	<div v-bind:class="cssClass">
		<div class="object-dependency--title" v-if="isSettlementResource">
			{{dependency.resource.getResource().name}}: {{dependency.resource.value}}
		</div>

		<div class="object-dependency--title" v-if="isSettlementBuilding">
			Gebäude: {{dependency.building.name}}
		</div>

		<div class="object-dependency--title" v-if="isSettlementBuildingSite">
			Bauplatz: {{dependency.number}}
		</div>

		<div class="object-dependency--title" v-if="isSettlementBuildingSingleton">
			Einmalig pro Siedlung
		</div>
	</div>
</template>

<script>
	import SettlementResource from 'dependencies/settlementresource';
	import SettlementBuilding from 'dependencies/settlementbuilding';
	import SettlementBuildingSite from 'dependencies/settlementbuildingsite';
	import SettlementBuildingSingleton from 'dependencies/settlementbuildingsingleton';

	export default {
		data: function() {
			return {};
		},

		props: ['dependency'],

		computed: {
			cssClass: function() {
				return {
					'object-dependency': true,
					'object-dependency--not-fulfilled': !this.dependency.fulfilled
				};
			},

			isSettlementResource: function() {
				return (this.dependency instanceof SettlementResource);
			},

			isSettlementBuilding: function() {
				return (this.dependency instanceof SettlementBuilding);
			},

			isSettlementBuildingSite: function() {
				return (this.dependency instanceof SettlementBuildingSite);
			},

			isSettlementBuildingSingleton: function() {
				return (this.dependency instanceof SettlementBuildingSingleton);
			}
		}
	}
</script>