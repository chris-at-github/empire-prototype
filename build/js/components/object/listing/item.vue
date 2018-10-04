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
						<li v-if="assignUnitsButtonVisible"><button class="button" v-on:click="assignUnits" v-bind:disabled="assignUnitsButtonDisabled">Arbeiter zuteilen</button></li>
						<li v-if="removeUnitsButtonVisible"><button class="button" v-on:click="removeUnits">Arbeiter abziehen</button></li>
					</ul>
				</div>
			</div>

			<div class="card--body-item" v-if="isPlanned">
				<div><strong>Geplant</strong></div>

				<div class="object--actions">
					<ul>
						<li v-if="assignUnitsButtonVisible"><button class="button" v-on:click="assignUnits" v-bind:disabled="assignUnitsButtonDisabled">Arbeiter zuteilen</button></li>
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
				if(this.properties.constructionState === Empire.object.CONSTRUCTION_STATE_UNDER_CONSTRUCTION) {
					return true;
				}

				return false;
			},

			isPlanned: function() {
				if(this.properties.constructionState === Empire.object.CONSTRUCTION_STATE_PLANNED) {
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

			// umgedrehte Logik -> return true -> Button disabled
			// @todo: Umbenennung in assignWorkerButtonDisabled
			assignUnitsButtonDisabled: function() {

				// Freie Arbeiter vorhanden?
				if(_.size(this.object.getSettlement().getAvailableUnits()) === 0) {
					return true;
				}

				return false;
			},

			// @todo: Umbenennung in assignWorkerButtonVisible
			assignUnitsButtonVisible: function() {

				// Bereits Arbeiter zugewiesen
				if(_.size(this.object.getUnits().all()) !== 0) {
					return false;
				}

				return true;
			},

			// @todo: Umbennenung in removeWorkerButtonVisible
			removeUnitsButtonVisible: function() {

				// Sind Arbeiter zugewiesen
				if(_.size(this.object.getUnits().all()) === 0) {
					return false;
				}

				return true;
			}
		},

		methods: {
			construct: function() {
				let object = this.object.construct();
						object.store();
			},

			// @todo: Umbenennung in assignWorker
			assignUnits: function() {
				if(this.isPlanned === true) {
					this.object.setConstructionState(Empire.object.CONSTRUCTION_STATE_UNDER_CONSTRUCTION);
				}

				this.object.assignUnits();
				this.object.store();
			},

			// @todo: Umbenennung in removeWorker
			removeUnits: function() {
				this.object.getUnits().empty();
				this.object.store();
			}
		}
	}
</script>