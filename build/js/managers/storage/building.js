'use strict';

import ObjectStore from './object';

let BuildingObjectStore = function() {
	ObjectStore.call(this);

	// Speicherort vordefinieren
	this.setStorage(Game.buildings);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ObjectStore}
 */
BuildingObjectStore.prototype = Object.create(ObjectStore.prototype);

export default BuildingObjectStore;