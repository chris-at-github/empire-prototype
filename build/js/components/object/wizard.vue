<template>
	<div class="object-wizard" v-if="objects.length !== 0">
		<div class="modal" v-if="modal">
			<div class="modal--container">
				<div class="modal--header">
					<div class="modal--title">Gebäude errichten</div>
				</div>
				<div class="modal--body">
					<emp-object-wizard-item v-for="object in objects"
						v-bind:key="object"
						v-bind:qcn="object"
					></emp-object-wizard-item>
				</div>
				<div class="modal--footer">
					<button class="button" v-on:click="modalClose">Abbrechen</button>
				</div>
			</div>
		</div>

		<button class="button" v-on:click="modalOpen">Errichten</button>
	</div>
</template>

<script>
	import ObjectWizardItem from './wizard/item';

	/**
	 * Beispielaufruf in SettlementIndex: <emp-object-wizard v-bind:store="buildingStore" v-bind:objects="availableBuildings" v-bind:parent="id"></emp-object-form>
	 *
	 * @param {object} store Zielobjekt zum Speichern der Objekte z.B. Game.buildings
	 * @param {array} objects (Namespace-) Liste mit Objekten zur Auswahl
	 * @param {string} parent Eltern-Id
	 */
	export default {
		components: {
			'emp-object-wizard-item': ObjectWizardItem
		},

		data: function() {
			return {
				// rerender: false,
				modal: false
			};
		},

		props: ['objects', 'parent', 'store'],

		methods: {

			// // @see: https://github.com/vuejs/Discussion/issues/356#issuecomment-312529480
			// rerender: function() {
			// 	this.rerender = true;
			// 	this.$nextTick(() => {
			// 		this.rerender = false;
			// 	});
			// },

			modalOpen: function() {
				this.modal = true;
			},

			modalClose: function() {
				this.modal = false;
			}
		}
	}
</script>