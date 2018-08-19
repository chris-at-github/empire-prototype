'use strict';

import ApplicationStore from './application';

// Object Storage Manager
// Extends Application Storage Manager
let ObjectStore = function() {
	ApplicationStore.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationStore}
 */
ObjectStore.prototype = Object.create(ApplicationStore.prototype);

/**
 * Speichert ein Objekt dem globalen Game.xxx Store hinzu. Das Storage Objekt muss zuvor ueber setStorage gesetzt worden
 * sein
 *
 * @param object
 * @return {Object}
 */
ObjectStore.prototype.store = function(object) {
	let persist = false;

	// neues Objekt -> noch keine ID erzeugt
	if(_.isUndefined(object.id) === true) {

		// 'beforeCreate'-Event feuern
		object.beforeCreate();

		// bestehendes Objekt
	} else {

		// Flag fuer die spaetere Verarbeitung setzen
		persist = true;

		// 'beforeUpdate'-Event feuern
		// object.beforeUpdate();
	}

	object = this._store(object);

	if(persist === false) {

		// 'afterCreate'-Event feuern
		object.afterCreate();
	}

	return object;
};

export default ObjectStore;