<template>
	<div class="card card-object">
		<div class="card--property">
			<div class="properties">
				<div class="property">
					<div class="property--title">Typ:</div>
					<div class="property--value">{{type}}</div>
				</div>

				<div class="property">
					<div class="property--title">Status:</div>
					<div class="property--value">{{state}}</div>
				</div>

				<div class="property" v-if="expedition.unit !== null">
					<div class="property--title">Arbeiter:</div>
					<div class="property--value">1 ({{expedition.getUnit().getActionPoints()}} AP)</div>
				</div>

				<div class="property" v-if="expedition.getResources().count() !== 0">
					<div class="property--title">Resource:</div>
					<div class="property--value">
						<emp-resource-value v-for="(value, key) in properties.resources"
							v-bind:key="key"
							v-bind:qcn="key"
							v-bind:value="value"></emp-resource-value>
					</div>
				</div>
			</div>

			<div class="object--actions">
				<ul>
					<li><button class="button" v-on:click="search">Suchen</button></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import ResourceValue from 'components/resource/value';

	export default {
		components: {
			'emp-resource-value': ResourceValue
		},

		data: function() {
			return {};
		},

		props: ['properties'],

		computed: {
			expedition: function() {
				let expedition = Empire.factory.expedition.create();
						expedition.fill(this.properties);

				return expedition;
			},

			type: function() {
				let types = {};
						types[Empire.expedition.TYPE_SEARCH] = 'Suche';
						types[Empire.expedition.TYPE_TARGET] = 'Vorgegebene Resource';

				return types[this.properties.type];
			},

			state: function() {
				let state = {};
						state[Empire.expedition.STATE_SEARCH] = 'Auf der Suche';
						state[Empire.expedition.STATE_MOVE_TO_SEARCH] = 'Auf der Suche';
						state[Empire.expedition.STATE_MOVE_TO_TARGET] = 'Auf dem Weg zur Resource';
						state[Empire.expedition.STATE_RETURN_TO_SETTLEMENT] = 'Auf dem Rückweg';
						state[Empire.expedition.STATE_ON_HOLD] = 'Warten';

				return state[this.properties.state];
			}
		},

		methods: {
			search: function() {
				this.expedition.search();
			}
		}
	}
</script>