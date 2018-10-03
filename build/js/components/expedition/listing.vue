<template>
	<div class="card-container expedition-container" v-if="expeditions.length !== 0">
		<emp-expedition-listing-item v-for="expedition in expeditions"
			v-bind:key="expedition.id"
			v-bind:properties="expedition"
		></emp-expedition-listing-item>
	</div>
</template>
<script>
	import ExpeditionListingItem from './listing/item';

	export default {
		components: {
			'emp-expedition-listing-item': ExpeditionListingItem
		},
		data: function() {
			return {};
		},
		props: ['expeditions']
	}
</script>