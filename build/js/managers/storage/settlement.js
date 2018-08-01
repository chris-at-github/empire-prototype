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
 * @param {object} properties 
 */
SettlementStorage.prototype.store = function(properties) {

	// @todo: throw exception -> falls kein Namespace uebergeben wurde
	let settlement = Empire.factory.settlement.create(properties.object);
			settlement.fill(properties);

	let persist = false;

	// neues Objekt -> noch keine ID erzeugt
	if(_.isUndefined(properties.id) === true) {

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
	properties = this._store(properties);
	settlement.id = properties.id;

	if(persist === false) {

		// 'afterCreate'-Event feuern
		settlement.afterCreate();
	}

	return this._store(properties);
};

export default SettlementStorage;