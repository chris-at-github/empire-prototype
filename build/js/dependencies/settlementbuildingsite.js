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
	// let settlement = this.getSettlement();
	// let dependency = this;
	//
	// if(settlement !== null) {
	// 	_.forEach(settlement.getBuildings(), function(building) {
	// 		if(building.qcn === dependency.building.qcn) {
	// 			dependency.fulfilled = true;
	// 		}
	// 	});
	// }
	this.fulfilled = true;

	return this.fulfilled;
};

export default SettlementBuildingSiteDependency;