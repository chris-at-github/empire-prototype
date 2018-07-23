<template>
	<div class="screen--settlement settlement" v-if="active">
		<div class="container">
			<header class="card--header">{{name}}</header>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {};
		},

		// props: ['id', 'properties'],
		props: ['name', 'screen'],

		// methods: {
		// 	active: function() {
		// 		console.log(Game.screen);
		// 		// return this.activexx;
		// 	}
		// },

		computed: {
			active: function() {
				if(this.screen === 'settlement') {
					return true;
				}

				return false;
			}
		}
	}
</script>