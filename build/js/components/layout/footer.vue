<template>
	<div id="empire-footer" class="d-flex">
		<div class="empire-footer--version">{{version}}</div>
		<div class="empire-footer--name">{{name}}</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				version: empire.configuration.version,
				name: empire.configuration.name
			};
		}
	}
</script>