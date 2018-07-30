'use strict';

let Application = function() {
	this.name = null;
};

/**
 * Liefert den fest hinterlegten Namen des Objekts
 *
 * @return string
 */
Application.prototype.getName = function(object) {
	return this.name;
};

export default Application;