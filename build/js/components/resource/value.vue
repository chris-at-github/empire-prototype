<template>
	<div class="resource">
		{{qcn}}: {{value}}
	</div>
</template>
<script>
	export default {
		data:  function() {
			return {};
		},
		props: ['qcn', 'value']
	}
</script>