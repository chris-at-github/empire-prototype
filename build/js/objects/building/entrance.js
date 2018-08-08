'use strict';

import Application from 'objects/application';

let Entrance = function() {
	Application.call(this);

	this.qcn = 'building.entrance';
	this.name = 'Eingang';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
Entrance.prototype = Object.create(Application.prototype);

/**
 * Lagerkapazitaet, die dieses Gebaeude zur Verfuegng stellt
 *
 * @return {float}
 */
Entrance.prototype.getStorageCapacity = function() {
	return 10;
};

export default Entrance;