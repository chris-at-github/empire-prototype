'use strict';

import Application from 'objects/application';

let LivingRoom = function() {
	Application.call(this);

	this.name = 'Wohnraum';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
LivingRoom.prototype = Object.create(Application.prototype);

export default LivingRoom;