<template>
	<div class="resource-container" v-if="resources.length !== 0">
		<emp-resource-value v-for="(value, key) in resources"
			v-bind:key="key"
			v-bind:qcn="key"
			v-bind:value="value"></emp-resource-value>
	</div>
</template>
<script>
	import ResourceValue from './value';

	export default {
		// @see: https://vuejs.org/v2/guide/components.html#Local-Registration
		components: {
			'emp-resource-value': ResourceValue
		},

		data: function() {
			return {};
		},

		props: ['resources']
	}
</script>