'use strict';

let ApplicationSettlement = function() {
};

/**
 * Liefert den fest hinterlegten Namen des Objekts
 *
 * @return {boolean}
 */
ApplicationSettlement.prototype.beforeCreate = function() {
	return true;
};

export default ApplicationSettlement;