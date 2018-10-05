'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import SettlementBuildingSiteDependency from "dependencies/settlementbuildingsite";

let ApplicationSettlement = function() {

	/**
	 * Zuruecksetzen der Event-Listener (ist sonst eine globale Mixin-Varible)
	 * @type {object}
	 */
	this.eventListener = {};

	/**
	 * maximale Lagermenge
	 *
	 * @type {number}
	 */
	this.storageCapacity = 0.0;

	/**
	 * Einheitenkapazitaet
	 *
	 * @type {int}
	 */
	this.unitCapacity = 0;

	/**
	 * maximale Bauplaetze
	 *
	 * @type {int}
	 */
	this.buildingSite = 0;

	/**
	 * prozentualer Einheitenzuwachs
	 *
	 * @type {number}
	 */
	this.unitIncreamentRate = 0.25;

	this._initialize();
};

// Konstanten Definition
ApplicationSettlement.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';
ApplicationSettlement.prototype.EVENT_AFTER_CREATE = 'afterCreate';
ApplicationSettlement.prototype.EVENT_AFTER_IDENTIFICATION = 'afterIdentification';

// Einbindung Mixins
Object.assign(ApplicationSettlement.prototype, SerializableMixin);
Object.assign(ApplicationSettlement.prototype, EventMixin);

/**
 * Initiale Arbeiten ausfuehren
 *
 * @return {void}
 */
ApplicationSettlement.prototype._initialize = function() {
	this.listen(Empire.event.EVENT_AFTER_TURN, this.processBuildingQueue);
};

/**
 * Wird VOR dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {boolean}
 */
ApplicationSettlement.prototype.beforeCreate = function() {
	this.fire(this.EVENT_BEFORE_CREATE);
	return true;
};

/**
 * Wird NACH dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {void}
 */
ApplicationSettlement.prototype.afterCreate = function() {
	this.fire(this.EVENT_AFTER_CREATE);
};

/**
 * Setzen der Id als Methode -> damit ein feuern Nach-Id-Setzen Events moeglich ist -> erst dann ist die Zuordnung von
 * Relationen (z.B. Gebaeuden) moeglich
 *
 * @param {int} id
 */
ApplicationSettlement.prototype.setId = function(id) {
	this.id = id;
	this.fire(this.EVENT_AFTER_IDENTIFICATION);
};

/**
 * Berechnet den verfuegbaren Lagerplatz fuer Rohstoffe
 *
 * @return {float}
 */
ApplicationSettlement.prototype.getStorageCapacity = function() {
	return this.storageCapacity;
};

/**
 * Berechnet die verfuegbare Einheitenkapazitaet fuer diese Siedlung
 *
 * @return {int}
 */
ApplicationSettlement.prototype.getUnitCapacity = function() {
	return this.unitCapacity;
};

/**
 * Gebaeude zur diesem Objekt
 *
 * @return {array}
 */
ApplicationSettlement.prototype.getBuildings = function() {
	let settlement = this;
	let buildings = {};

	// Vorfilterung
	// @todo: Caching
	_.forEach(_.filter(Game.buildings, function(building) {
		if(building.parent === settlement.id) {
			return building;
		}

	// Objekterstellung
	}), function(building) {
		buildings[building.id] = Empire.factory.object.create(building.qcn);
		buildings[building.id].fill(building);
	});

	return buildings;
};

/**
 * Berechnet die verfuegbaren Bauplaetze.
 * aus allen bestehenden Gebaeuden werden die Bauplatzabhaengigkeiten zusammengezaehlt
 *
 * @return {int}
 */
ApplicationSettlement.prototype.getAvailableBuildingSite = function() {
	let occupied = 0;

	_.forEach(this.getBuildings(), function(building) {
		_.forEach(building.getDependencies(), function(dependency) {
			if(dependency instanceof SettlementBuildingSiteDependency) {
				occupied += dependency.number;
			}
		});
	});

	return this.buildingSite - occupied;
};

/**
 * Der Siedlung zugeordnete Einheiten
 *
 * @return {object}
 */
ApplicationSettlement.prototype.getUnits = function() {
	let settlement = this;
	let units = {};

	// Vorfilterung
	// @todo: Caching
	_.forEach(_.filter(Game.units, function(unit) {
		if(unit.parent === settlement.id) {
			return unit;
		}

		// Objekterstellung
	}), function(unit) {
		units[unit.id] = Empire.factory.unit.create(unit.qcn);
	});

	return units;
};

/**
 * Anzahl der zugeordneten Einheiten
 *
 * @return {object}
 */
ApplicationSettlement.prototype.countUnits = function() {
	return _.size(this.getUnits());
};

/**
 * Berechnet die verfuegbaren Einwohner / Arbeiter
 *
 * @return {object}
 */
ApplicationSettlement.prototype.getAvailableWorker = function() {

	// Einheiten sammeln, die dieser Siedlung zugeordnet sind
	let units = Empire.manager.unit.find({
		qcn: 'unit.worker',
		settlement: this.id
	}, Empire.manager.unit.RETURN_TYPE_JSON);

	// Einheiten abziehen, die bereits Gebaeuden zugeordnet sind
	_.forEach(this.getBuildingWorkerKeys(), function(id) {
		delete units[id];
	});

	return units;
};

/**
 * Berechnet den prozentualen Einheitenzuwachs
 *
 * @return {number}
 */
ApplicationSettlement.prototype.getUnitIncreamentRate = function() {
	return this.unitIncreamentRate;
};

/**
 * Liefert eine Liste (IDs) von Einheiten, die Gebaueden zugeordnet sind
 *
 * @return {array}
 */
ApplicationSettlement.prototype.getBuildingWorkerKeys = function() {
	let units = [];

	_.forEach(Empire.manager.object.find({
		settlement: this.id
	}, Empire.manager.object.TYPE_BUILDING, Empire.manager.object.RETURN_TYPE_JSON), function(building) {
		if(_.isEmpty(building.units) === false) {

			_.forEach(building.units, function(unit) {
				units.push(unit);
			});
		}
	});

	return units;
};

/**
 * Verarbeitet offene Bauauftraege (falls bei Arbeitern noch AP vorhanden sind)
 *
 * @return {void}
 */
ApplicationSettlement.prototype.processBuildingQueue = function() {

	// Lade alle Status Bau befindlichen Gebaeude
	_.forEach(Empire.manager.object.find({
		settlement: this.id,
		constructionState: Empire.object.CONSTRUCTION_STATE_UNDER_CONSTRUCTION
	}, Empire.manager.object.TYPE_BUILDING, Empire.manager.object.RETURN_TYPE_OBJECT), function(building) {
		building.construct();
		building.store();
	});
};

export default ApplicationSettlement;