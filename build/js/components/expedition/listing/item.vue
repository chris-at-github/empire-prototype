<template>
	<div class="card card-object">
		<div class="card--body">
			EXPEDITION {{properties.id}}
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {};
		},

		props: ['properties'],

		computed: {
			expedition: function() {
				let expedition = new Empire.expedition();
				expedition.fill(this.properties);

				return expedition;
			}
		},

		methods: {
		}
	}
</script>