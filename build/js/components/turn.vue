<template>
	<div class="turn">
		<div class="turn--title">Runde</div>
		<div class="turn--number">{{turn}}</div>
		<div class="turn--action">
			<button class="button" v-on:click="next">nächste Runde</button>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {};
		},

		computed: {
			turn: function() {
				return Game.turn;
			}
		},

		methods: {
			next: function() {
				Empire.manager.turn.next();
			}
		}
	}
</script>