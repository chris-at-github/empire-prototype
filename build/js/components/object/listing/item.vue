<template>
	<div class="card card-object">
		<header class="card--header">{{object.getName()}}</header>

		<div class="card--body">
			<div class="card--body-item" v-if="isUnderConstruction">
				<div>Im Bau</div>

				<div class="properties">
					<div class="property">
						<div class="property--title">Baupunkte:</div>
						<div class="property--value">{{properties.constructionPointsCreated}} / {{object.constructionPoints}} ({{constructionProgress}}%)</div>
					</div>
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
			object: function() {
				let object = Empire.factory.object.create(this.properties.qcn);
						object.fill(this.properties);

				return object;
			},

			isUnderConstruction: function() {
				if(this.properties.constructionState === this.object.CONSTRUCTION_STATE_UNDER_CONSTRUCTION) {
					return true;
				}

				return false;
			},

			// @see: https://www.blitzrechner.de/prozent/#prozentsatz
			constructionProgress: function() {
				return (this.properties.constructionPointsCreated / this.object.constructionPoints) * 100;
			}
		}
	}
</script>