'use strict';

import SettlementResourceDependency from "dependencies/settlementresource";
import SettlementStorageManager from 'managers/storage/settlement';
import UnitStorageManager from 'managers/storage/unit';
import ForeignCollection from 'collection/foreign';

let Building = {

	/**
	 * Initializierung des Gebauede Objektes
	 *
	 * @return {void}
	 */
	initializeBuilding: function() {

		let building = this;

		// Eigenschaft units als Collection Objekt definieren
		this.units = new ForeignCollection({
			fill: function(json) {
				building.fillUnits(this, json);
			}
		});

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
	 * befuellt die (Collection-) Eigenschaft units
	 *
	 * @param {object} collection
	 * @param {object} json
	 */
	fillUnits: function(collection, json) {
		_.forEach(json, function(id) {
			if(_.isUndefined(Game.units[id]) === false) {
				let data = Game.units[id];

				let object = Empire.factory.unit.create(data.qcn);
						object.fill(data);

				collection.set(id, object);
			}
		});
	},

	/**
	 * liefert die Arbeiter, die dem Gebaeude zugeordnet sind zurueck
	 *
	 * @return {object}
	 */
	getUnits: function() {
		return this.units;
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
	 * @return {object} building
	 */
	construct: function() {
		if(this.constructionState !== this.CONSTRUCTION_STATE_UNDER_CONSTRUCTION) {
			return false;
		}

		let building = this;
		let unitStorage = new UnitStorageManager();

		// Arbeiter laden (Objekte -> getUnits())
		_.forEach(this.getUnits().all(), function(unit) {

			// Arbeiter durchlaufen und Actions Points abfragen
			// IF Actions Points > 0 -> Construction Points =- AP * Construction Rate
			if(building.constructionState === building.CONSTRUCTION_STATE_UNDER_CONSTRUCTION && unit.getActionPoints() !== 0) {
				let unitConstructionPoints = unit.getActionPoints() * unit.getConstructionRate();

				// Wenn durch die AP der Einheit das Gebaeude noch nicht fertiggestellt wird
				if(building.constructionPoints >= (unitConstructionPoints + building.constructionPointsCreated)) {

					// Fortschritt verarbeiten
					building.constructionPointsCreated += unitConstructionPoints;

					// AP der Einheit abziehen
					unit.setActionPoints(0);

				} else {

					// AP der Einheit (anteilig) abziehen
					// Wichtig vor dem Baufortschritt die Berechnung durchfuehren -> sonst kommt hier 0 raus
					unit.setActionPoints(unit.getActionPoints() - ((building.constructionPoints - building.constructionPointsCreated) / unit.getConstructionRate()));

					// Fortschritt verarbeiten
					building.constructionPointsCreated = building.constructionPoints;
				}

				// AP der Einheit speichern
				unitStorage.store(unit);
			}

			// Gebaeude fertiggestellt
			if(building.constructionPoints === building.constructionPointsCreated) {

				// Status auf Fertig stellen und Eigenschaft constructionPointsCreated entfernen
				building.constructionState = building.CONSTRUCTION_STATE_CREATED;
				delete building.constructionPointsCreated;

				// Arbeiter wieder freistellen
				building.units.empty();
			}
		});

		return building;
	}
};

export default Building;