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
	var settlement = Empire.factory.settlement.create(properties.object);

	// neues Objekt -> noch keine ID erzeugt
	if(_.isUndefined(properties.id) === true) {
		settlement.beforeCreate();
	}

	// return this._store(properties);
};

export default SettlementStorage;