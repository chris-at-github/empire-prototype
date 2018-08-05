'use strict';

let ApplicationResource = function() {
	this.name = null;
};

/**
 * Liefert den fest hinterlegten Namen der Resource
 *
 * @return string
 */
ApplicationResource.prototype.getName = function() {
	return this.name;
};

export default ApplicationResource;