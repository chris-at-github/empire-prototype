'use strict';

import Application from 'objects/application';

let StoreRoom = function() {
	Application.call(this);

	this.name = 'Lagerraum';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
StoreRoom.prototype = Object.create(Application.prototype);

export default StoreRoom;