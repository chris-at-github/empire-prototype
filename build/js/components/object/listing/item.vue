<template>
	<div class="card card-object">
		<header class="card--header">{{object.getName()}}</header>

		<div class="card--body"></div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				parent: this.$parent.parent
			};
		},

		props: ['properties'],

		computed: {
			object: function() {
				let object = Empire.factory.object.create(this.properties.qcn);
						object.fill(this.properties);

				return object;
			}
		}
	}
</script>