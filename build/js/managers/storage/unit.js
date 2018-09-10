'use strict';

import EmpireStore from './application';

// Unit Storage Manager
// Extends Application Storage Manager
let UnitStore = function() {
	EmpireStore.call(this);

	// Storage festlegen
	this.storage = Game.units;
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationStore}
 */
UnitStore.prototype = Object.create(EmpireStore.prototype);

/**
 * Speichert eine Einheit dem globalen Game.units Store hinzu.
 *
 * @param unit
 * @return {Object}
 */
UnitStore.prototype.store = function(unit) {
	let persist = false;

	// neue Einheit -> noch keine ID erzeugt
	if(_.isUndefined(unit.id) === true) {

		// 'beforeCreate'-Event feuern
		unit.beforeCreate();

		// bestehendes Objekt
	} else {

		// Flag fuer die spaetere Verarbeitung setzen
		persist = true;

		// 'beforeUpdate'-Event feuern
		// object.beforeUpdate();
	}

	unit = this._store(unit);

	if(persist === false) {

		// 'afterCreate'-Event feuern
		unit.afterCreate();
	}

	return unit;
};

export default UnitStore;