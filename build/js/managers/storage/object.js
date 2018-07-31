'use strict';

import ApplicationStore from 'managers/storage/application';

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
	return this._store(object);
};

export default ObjectStore;