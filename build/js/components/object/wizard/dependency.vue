<template>
	<div v-bind:class="cssClass">
		<div class="object-dependency--inner" v-if="isSettlementResource">
			{{dependency.resource.getResource().name}}: {{dependency.resource.value}}
		</div>
	</div>
</template>

<script>
	import SettlementResource from 'dependencies/settlementresource';

	export default {
		data: function() {
			return {};
		},

		props: ['dependency'],

		computed: {
			cssClass: function() {
				return {
					'object-dependency': true,
					'object-dependency--not-fulfilled': !this.dependency.fulfilled,
					'object-dependency--settlement-resource': this.isSettlementResource
				};
			},

			isSettlementResource: function() {
				return (this.dependency instanceof SettlementResource);
			}
		}
	}
</script>