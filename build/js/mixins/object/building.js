'use strict';

import SettlementResourceDependency from "dependencies/settlementresource";
import SettlementStorageManager from 'managers/storage/settlement';

let Building = {

	/**
	 * liefert das aktive Settlement Objekt zurueck
	 *
	 * @return {object} ApplicationSettlement
	 */
	getSettlement: function() {
		let id = this.parent;
		let settlement = null;

		if(id !== null && _.isUndefined(Game.settlements[id]) === false) {
			let properties = Game.settlements[id];

			settlement = Empire.factory.settlement.create(properties.qcn);
			settlement.fill(properties);
		}

		return settlement;
	},

	/**
	 * Verarbeitet nach Erstellung die abhaengigen Resourcen
	 *
	 * @return {void}
	 */
	processDependencyResources: function() {
		let settlement = this.getSettlement();
		let manager = new SettlementStorageManager();

		_.forEach(this.getDependencies(), function(dependency) {
			if(dependency instanceof SettlementResourceDependency) {
				settlement.resources.subResourceValue(dependency.resource);
			}
		});

		manager.store(settlement);
	}
};

export default Building;