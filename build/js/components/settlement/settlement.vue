<template>
	<div class="screen--settlement settlement" v-if="screen == 'settlement'">
		<div class="container">
			<header class="card--header">{{name}} - {{screen}}</header>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {};
		},

		// props: ['id', 'properties'],
		props: ['name', 'screen']

		// methods: {
		// 	active: function() {
		// 		console.log(Game.screen);
		// 		// return this.activexx;
		// 	}
		// },

		// computed: {
		// 	activex: function() {
		// 		// console.log(Game);
		// 		//
		// 		// if(Game.screen === 'settlement') {
		// 		// 	return true;
		// 		// }
		//
		// 		// console.log(Game.screen);
		//
		// 		return false;
		// 	}
		// }
	}
</script>