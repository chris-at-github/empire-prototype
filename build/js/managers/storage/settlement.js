'use strict';

import ApplicationStorage from 'managers/storage/application';

// Settlement Storage Manager
// Extends Application Storage Manager
let SettlementStorage = function() {
	ApplicationStorage.call(this);
	this.storage = Game.settlements;
};

/**
 * Vererbung der ApplicationStorage Methoden
 */
SettlementStorage.prototype = Object.create(ApplicationStorage.prototype);

/**
 * Speichert die Daten eines Objekts ApplicationSettlement ab
 * @param {object} settlement 
 */
SettlementStorage.prototype.store = function(settlement) {
	let persist = false;

	// neues Objekt -> noch keine ID erzeugt
	if(_.isUndefined(settlement.id) === true) {

		// 'beforeCreate'-Event feuern
		settlement.beforeCreate();

	// bestehendes Objekt
	} else {

		// Flag fuer die spaetere Verarbeitung setzen
		persist = true;

		// 'beforeUpdate'-Event feuern
		// settlement.beforeUpdate();
	}

	// Zwischenspeichern und ID setzen
	settlement = this._store(settlement);

	if(persist === false) {

		// 'afterCreate'-Event feuern
		settlement.afterCreate();
	}

	return this._store(settlement);
};

export default SettlementStorage;