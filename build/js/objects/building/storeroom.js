'use strict';

import Application from 'objects/application';

let StoreRoom = function() {
	Application.call(this);

	this.qcn = 'building.storeRoom';
	this.name = 'Lagerraum';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
StoreRoom.prototype = Object.create(Application.prototype);

/**
 * Lagerkapazitaet, die dieses Gebaeude zur Verfuegng stellt
 *
 * @return {float}
 */
StoreRoom.prototype.getStorageCapacity = function() {
	return 40;
};

export default StoreRoom;