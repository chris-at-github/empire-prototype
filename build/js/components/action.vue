<template>
	<button class="button" v-on:click="action.execute()" v-bind:disabled="action.isEnabled() === false">{{action.getLabel()}}</button>
</template>

<script>
	export default {
		data: function() {
			return {};
		},

		props: ['action']
	}
</script>