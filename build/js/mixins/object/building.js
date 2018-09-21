'use strict';

import SettlementResourceDependency from "dependencies/settlementresource";
import SettlementStorageManager from 'managers/storage/settlement';
import UnitStorageManager from 'managers/storage/unit';

let Building = {

	/**
	 * Initializierung des Gebauede Objektes
	 *
	 * @return {void}
	 */
	initializeBuilding: function() {

		// Einheiten (units) als Eigenschaft registieren
		this.addProperty('units');

		// Rohstoffverbrauch nach Erstellungsauftrag verarbeiten
		this.listen(this.EVENT_AFTER_CREATE, this.processDependencyResources);
	},

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
	 * liefert die Arbeiter, die dem Gebaeude zugeordnet sind zurueck
	 *
	 * @return {object}
	 */
	getUnits: function() {
		let units = {};

		_.forEach(this.units, function(id) {
			if(_.isUndefined(Game.units[id]) === false) {
				let data = Game.units[id];

				units[id] = Empire.factory.unit.create(data.qcn);
				units[id].fill(data);
			}
		});

		return units;
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
	},

	/**
	 * Erstellt ein Objekt
	 *
	 * @return {boolean}
	 */
	construct: function() {
		if(this.constructionState !== this.CONSTRUCTION_STATE_UNDER_CONSTRUCTION) {
			return false;
		}

		let building = this;
		let unitStorage = new UnitStorageManager();

		// Arbeiter laden (Objekte -> getUnits())
		_.forEach(this.getUnits(), function(unit) {

			// Arbeiter durchlaufen und Actions Points abfragen
			// IF Actions Points > 0 -> Construction Points =- AP * Construction Rate
			if(unit.getActionPoints() !== 0) {
				let unitConstructionPoints = unit.getActionPoints() * unit.getConstructionRate();

				// Wenn durch die AP der Einheit das Gebaeude noch nicht fertiggestellt wird
				if(building.constructionPoints >= (unitConstructionPoints + building.constructionPointsCreated)) {

					// Fortschritt verarbeiten
					building.constructionPointsCreated += unitConstructionPoints;

					// AP der Einheit abziehen
					unit.setActionPoints(0);

				} else {

				}

				// AP der Einheit speichern
				unitStorage.store(unit);
			}

			console.log(building);
		});

		return true;
	}
};

export default Building;