<template>
	<div class="card card-object">
		<header class="card--header">{{object.getName()}}</header>

		<div class="card--body">
			<div class="card--body-item" v-if="isUnderConstruction">
				<div class="properties">
					<div class="properties--title">Im Bau</div>
					<div class="property">
						<div class="property--title">Baupunkte:</div>
						<div class="property--value">{{properties.constructionPointsCreated}} / {{object.constructionPoints}} ({{constructionProgress | round(2)}}%)</div>
					</div>

					<div class="property">
						<div class="property--title">Arbeiter:</div>
						<div class="property--value">{{properties.units | size}}</div>
					</div>
				</div>

				<div class="object--actions">
					<ul>
						<li><button class="button" v-on:click="construct" v-bind:disabled="constructDisabled">Errichten</button></li>
					</ul>
				</div>
			</div>

			<div class="card--body-item" v-if="isPlanned">
				<div><strong>Geplant</strong></div>

				<div class="object--actions">
					<ul>
						<li>
							<button class="button" v-on:click="assignUnits" v-bind:disabled="assignUnitsDisabled">Arbeiter zuteilen</button>
						</li>
					</ul>
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

			isPlanned: function() {
				if(this.properties.constructionState === this.object.CONSTRUCTION_STATE_PLANNED) {
					return true;
				}

				return false;
			},

			// @see: https://www.blitzrechner.de/prozent/#prozentsatz
			constructionProgress: function() {
				return (this.properties.constructionPointsCreated / this.object.constructionPoints) * 100;
			},

			constructDisabled: function() {
				if(this.object.constructEnabled() === true) {
					return false;
				}

				return true;
			},

			assignUnitsDisabled: function() {
				return false;
			}
		},

		methods: {
			construct: function() {
				let object = this.object.construct();
						object.store();
			},

			assignUnits: function() {

			}
		}
	}
</script>