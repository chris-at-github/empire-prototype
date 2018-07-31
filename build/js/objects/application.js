'use strict';

let ApplicationObject = function() {
	this.name = null;
};

/**
 * Liefert den fest hinterlegten Namen des Objekts
 *
 * @return string
 */
ApplicationObject.prototype.getName = function(object) {
	return this.name;
};

export default ApplicationObject;