'use strict';

import EmpireDependency from './empire';

let SettlementBuildingSingletonDependency = function(building) {
	EmpireDependency.call(this);

	/**
	 * @var {object} ApplicationObject
	 */
	this.building = building;
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {EmpireDependency}
 */
SettlementBuildingSingletonDependency.prototype = Object.create(EmpireDependency.prototype);

/**
 * Prueft, anhand des uebergebenen Objekts, ob die Abhaengigkeit erfuellt werden kann
 *
 * @param {object} object
 * @return {boolean}
 */
SettlementBuildingSingletonDependency.prototype.check = function(object) {
	let settlement = this.getSettlement();
	let dependency = this;

	// erstmal auf erfuellt setzen -> ist einfacher fuer die Logik der foreach Schleife
	this.fulfilled = true;

	if(settlement !== null) {
		_.forEach(settlement.getBuildings(), function(building) {
			if(building.qcn === dependency.building.qcn) {
				dependency.fulfilled = false;
			}
		});

	}

	return this.fulfilled;
};

export default SettlementBuildingSingletonDependency;