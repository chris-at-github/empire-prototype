'use strict';

import EmpireDependency from './empire';

let SettlementBuildingDependency = function(qcn) {
	EmpireDependency.call(this);

	/**
	 * @var {object} ApplicationObject
	 */
	this.building = Empire.factory.object.create(qcn);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {EmpireDependency}
 */
SettlementBuildingDependency.prototype = Object.create(EmpireDependency.prototype);

/**
 * Prueft, anhand des uebergebenen Objekts, ob die Abhaengigkeit erfuellt werden kann
 *
 * @param {object} object
 * @return {boolean}
 */
SettlementBuildingDependency.prototype.check = function(object) {
	let settlement = this.getSettlement();
	let dependency = this;

	if(settlement !== null) {
		_.forEach(settlement.getBuildings(), function(building) {
			if(building.qcn === dependency.building.qcn) {
				dependency.fulfilled = true;
			}
		});

	}

	return this.fulfilled;
};

export default SettlementBuildingDependency;