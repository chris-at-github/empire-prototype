'use strict';

import EmpireDependency from './empire';

let SettlementBuildingSiteDependency = function(number) {
	EmpireDependency.call(this);

	/**
	 * @var {int} ApplicationObject
	 */
	this.number = parseInt(number);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {EmpireDependency}
 */
SettlementBuildingSiteDependency.prototype = Object.create(EmpireDependency.prototype);

/**
 * Prueft, anhand des uebergebenen Objekts, ob die Abhaengigkeit erfuellt werden kann
 *
 * @param {object} object
 * @return {boolean}
 */
SettlementBuildingSiteDependency.prototype.check = function(object) {
	let settlement = this.getSettlement();

	if(settlement !== null) {
		if((settlement.getAvailableBuildingSite() - this.number) >= 0) {
			this.fulfilled = true;
		}
	}

	return this.fulfilled;
};

export default SettlementBuildingSiteDependency;