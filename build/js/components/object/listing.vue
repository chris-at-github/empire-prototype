<template>
	<div class="card-container object-container">
		<div class="card card-object" v-for="(object, id) in objects">
			<header class="card--header">{{object.object}}</header>
		</div>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
			};
		},
		props: ['objects']
	}
</script>