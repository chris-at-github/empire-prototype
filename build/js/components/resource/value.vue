<template>
	<div class="resource">
		{{object.name}}: {{value}}
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