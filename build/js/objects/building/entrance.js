'use strict';

import Application from 'objects/application';

let Entrance = function() {
	Application.call(this);

	this.name = 'Eingang';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
Entrance.prototype = Object.create(Application.prototype);

export default Entrance;