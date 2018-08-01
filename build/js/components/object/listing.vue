<template>
	<div class="card-container object-container" v-if="objects.length !== 0">
		<div class="card card-object" v-for="(object, id) in objects">
			<header class="card--header">{{getObject(object).getName()}}</header>
		</div>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				'objectCache': {}
			};
		},
		props: ['objects'],
		methods: {
			getObject: function(object) {
				if(_.isUndefined(this.objectCache[object.id]) === true) {
					this.objectCache[object.id] = Empire.factory.object.create(object.qcn);
				}

				return this.objectCache[object.id];
			}
		}
	}
</script>