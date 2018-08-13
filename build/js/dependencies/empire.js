'use strict';

let EmpireDependency = function() {

	/**
	 * Gibt an ob die Abhaengigkeit erfuellt ist
	 *
	 * @var {boolean}
	 */
	this.fulfilled = false;
};

/**
 * liefert das aktive Settlement Objekt zurueck
 *
 * @return {object} ApplicationSettlement
 */
EmpireDependency.prototype.getSettlement = function() {
	let id = Empire.manager.activate.getSettlement();
	let settlement = null;

	if(id !== null && _.isUndefined(Game.settlements[id]) === false) {
		let properties = Game.settlements[id];

		settlement = Empire.factory.settlement.create(properties.qcn);
		settlement.fill(properties);
	}

	return settlement;
};

export default EmpireDependency;