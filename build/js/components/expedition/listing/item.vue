<template>
	<div class="card card-object">
		<div class="card--property">
			<div class="properties">
				<div class="property">
					<div class="property--title">Typ:</div>
					<div class="property--value">{{type}}</div>
				</div>
			</div>
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
			},

			type: function() {
				let types = {}
						types[Empire.expedition.TYPE_SEARCH] = 'Suche';
						types[Empire.expedition.TYPE_TARGET] = 'Vorgegebene Resource';

				return types[this.properties.type];
			}
		},

		methods: {
		}
	}
</script>