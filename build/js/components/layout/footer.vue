<template>
	<div id="empire-footer" class="d-flex">
		<div class="empire-footer--version">{{version}}</div>
		<div class="empire-footer--name">{{name}}</div>

		<div class="empire-footer--turn">
			<emp-turn></emp-turn>
		</div>
	</div>
</template>

<script>
	import Turn from 'components/turn';

	export default {
		components: {
			'emp-turn': Turn
		},

		data: function() {
			return {
				version: Empire.configuration.version,
				name: Empire.configuration.name
			};
		}
	}
</script>