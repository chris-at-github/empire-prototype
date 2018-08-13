'use strict';

import EmpireDependency from './empire';

let SettlementResourceDependency = function() {
	EmpireDependency.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {EmpireDependency}
 */
SettlementResourceDependency.prototype = Object.create(EmpireDependency.prototype);

/**
 * Prueft, anhand des uebergebenen Objekts, ob die Abhaengigkeit erfuellt werden kann
 *
 * @param {object} object
 * @return {boolean}
 */
SettlementResourceDependency.prototype.check = function(object) {
	this.fulfilled = false;
	return this.fulfilled;
};

export default SettlementResourceDependency;