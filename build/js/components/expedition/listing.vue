<template>
	<div class="card-container expedition-container" v-if="expeditions.length !== 0">
<!--
		<emp-object-listing-item v-for="object in objects"
														 v-bind:key="object.id"
														 v-bind:properties="object"
		></emp-object-listing-item>
-->
		EXPEDITIONS
	</div>
</template>
<script>
	// import ObjectListingItem from './listing/item';

	export default {
		// components: {
		// 	'emp-object-listing-item': ObjectListingItem
		// },
		data: function() {
			return {};
		},
		props: ['expeditions']
	}
</script>