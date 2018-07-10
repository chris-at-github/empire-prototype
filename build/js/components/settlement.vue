<template>
	<div class="settlement">
SETTLEMENT
	</div>
</template>

<script>

	export default {
		data: function() {
			return {};
		},

		methods: {
		},

		computed: {
			// objects: function() {
			// 	console.log(empire.store);
			//
			// 	return this.store;
			// }
		},

		created: function() {
			this.store = empire.store.objects;
		}
	}
</script>