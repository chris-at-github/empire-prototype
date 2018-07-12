<template>
	<div class="card settlement">
		<header class="card--header">{{name}}</header></div>
</template>

<script>

	export default {
		data: function() {
			return {};
		},

		props: ['id', 'properties'],

		methods: {
		},

		computed: {
			name: function() {
				return this.properties.name;
			}
		}
	}
</script>