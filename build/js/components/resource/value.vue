<template>
	<div class="resource">
		<div class="resource--title">{{object.name}}:</div>
		<div class="resource--value">{{value}}</div>
	</div>
</template>
<script>
	export default {
		data:  function() {
			return {};
		},
		props: ['qcn', 'value'],
		computed: {
			object: function() {
				return Empire.factory.resource.create(this.qcn);
			},
		}
	}
</script>