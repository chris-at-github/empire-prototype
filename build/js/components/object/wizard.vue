<template>
	<div class="object-wizard" v-if="objects.length !== 0">
		<emp-object-wizard-item v-for="object in objects"
			v-bind:key="object"
			v-bind:qcn="object"
		></emp-object-wizard-item>
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
			return {};
		},

		props: ['objects', 'parent', 'store']
	}
</script>