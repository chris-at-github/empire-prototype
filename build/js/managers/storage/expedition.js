'use strict';

import EmpireStore from './application';

// Expedition Storage Manager
// Extends Application Storage Manager
let ExpeditionStore = function() {
	EmpireStore.call(this);

	// Storage festlegen
	this.storage = Game.expeditions;
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationStore}
 */
ExpeditionStore.prototype = Object.create(EmpireStore.prototype);

/**
 * Speichert eine Expedition im globalen Game.units Store
 *
 * @param {object} EmpireExpedition
 * @return {object} EmpireExpedition
 */
ExpeditionStore.prototype.store = function(expedition) {
	let persist = false;

	// neue Einheit -> noch keine ID erzeugt
	if(_.isUndefined(expedition.id) === true) {

		// 'beforeCreate'-Event feuern
		expedition.beforeCreate();

		// bestehendes Objekt
	} else {

		// Flag fuer die spaetere Verarbeitung setzen
		persist = true;

		// 'beforeUpdate'-Event feuern
		// object.beforeUpdate();
	}

	expedition = this._store(expedition);

	if(persist === false) {

		// 'afterCreate'-Event feuern
		expedition.afterCreate();
	}

	return this._store(expedition);
};

export default ExpeditionStore;