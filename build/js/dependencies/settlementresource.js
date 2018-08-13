'use strict';

import EmpireDependency from './empire';
import ResourceValue from 'resources/value';

let SettlementResourceDependency = function(qcn, value) {
	EmpireDependency.call(this);

	/**
	 * @var {object} ResourceValue
	 */
	this.resource = new ResourceValue(qcn, value);
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
	let settlement = this.getSettlement();

	if(settlement !== null) {
		let settlementResource = settlement.resources.getResourceValue(this.resource.qcn);

		if(settlementResource !== null && settlementResource.value >= this.resource.value) {
			this.fulfilled = true;
		}
	}

	return this.fulfilled;
};

export default SettlementResourceDependency;