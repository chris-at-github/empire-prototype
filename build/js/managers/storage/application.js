'use strict';

// Uuid/v4 Generator
// @see: https://www.npmjs.com/package/uuid
var uuid = require('uuid/v4');

let Application = function() {
	this.storage = null;
};

/**
 * Speichert ein Object im angegebenen Storage
 * Ist es ein neues Object und besitzt noch keine ID, wird eine neue Uuid/v4 erzeugt
 *
 * @param object
 * @return object
 */
Application.prototype._store = function(object) {

	if(_.isUndefined(object.id) === true) {
		object.id = uuid();
	}

	// Object Vue global verfuegbar machen
	Vue.set(this.storage, object.id, object);

	return object;
};

export default Application;