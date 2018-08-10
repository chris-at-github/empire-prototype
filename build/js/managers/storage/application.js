'use strict';

// Uuid/v4 Generator
// @see: https://www.npmjs.com/package/uuid
var uuid = require('uuid/v4');

let ApplicationStore = function() {
	this.storage = null;
};

/**
 * setzt den Speicherort fuer ueber Application._store gesetzte Objekte
 *
 * @param {object} storage
 * @return {void}
 */
ApplicationStore.prototype.setStorage = function(storage) {
	this.storage = storage;
};

/**
 * Speichert ein Object im angegebenen Storage
 * Ist es ein neues Object und besitzt noch keine ID, wird eine neue Uuid/v4 erzeugt
 *
 * @param object
 * @return object
 */
	ApplicationStore.prototype._store = function(object) {

	if(_.isUndefined(object.id) === true) {
		object.setId(uuid());
	}

	// Object Vue global verfuegbar machen
	Vue.set(this.storage, object.id, object.toJson());

	return object;
};

export default ApplicationStore;