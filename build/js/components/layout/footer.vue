<template>
	<div id="empire-footer">
		<div class="empire-footer--version">{{version}}</div>
		<div class="empire-footer--name">name</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				version: '',
				name: ''
			};
		},

		methods: {},

		computed: {
			// version: function() {
			// 	// console.log(this.version);
			//
			// 	return 'XXX';
			// }
		},

		created: function() {
			this.version = '0.0.1';
		}
	}
</script>