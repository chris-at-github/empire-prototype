<template>
	<div class="card-container settlement-container">
		<div class="card card-settlement" v-for="(settlement, id) in settlements">
			<header class="card--header" v-on:click="activate(id)">{{settlement.name}}</header>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				settlements: Game.settlements
			};
		},
		methods: {
			activate: function(id) {
				Empire.Managers.Screen.activate(Empire.Managers.Screen.SETTLEMENT);
				Empire.Managers.Activate.settlement(id);
			}
		}
	}
</script>