<template>
	<div class="screen screen--settlement object settlement" v-if="active">
		<div class="container">
			<header class="object--header">
				<div class="object--title">{{name}}</div>
			</header>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {};
		},

		props: ['screen', 'activate'],

		computed: {
			active: function() {
				if(this.screen === Empire.manager.screen.SETTLEMENT && this.activate.settlement !== null) {
					return true;
				}

				return false;
			},

			properties: function() {
				if(_.isUndefined(Game.settlements[this.activate.settlement]) === false) {
					return Game.settlements[this.activate.settlement];
				}
			},

			object: function() {
				return Empire.factory.settlement.create(this.properties.object);
			},

			name: function() {
				return this.properties.name;
			}
		}
	}
</script>