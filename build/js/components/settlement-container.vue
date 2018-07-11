<template>
	<div class="card-container settlement-container">
		<emp-settlement
			v-for="(settlement, id) in settlements"
			v-bind:id="id"
			v-bind:properties="settlement"
			v-bind:key="id">
		</emp-settlement>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				settlements: game.settlements
			};
		}
	}
</script>