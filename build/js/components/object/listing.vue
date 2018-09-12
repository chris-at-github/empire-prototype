<template>
	<div class="card-container object-container" v-if="objects.length !== 0">
		<!--
		<div class="card card-object" v-for="(object, id) in objects">
			<header class="card--header">{{getObject(object).getName()}}</header>

			<div class="card--body">

			</div>
		</div>
-->
		<emp-object-listing-item v-for="object in objects"
			 v-bind:key="object.id"
			 v-bind:properties="object"
		></emp-object-listing-item>
	</div>
</template>
<script>
	import ObjectListingItem from './listing/item';

	export default {
		components: {
			'emp-object-listing-item': ObjectListingItem
		},
		data: function() {
			return {};
		},
		props: ['objects']
	}
</script>