'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import SettlementBuildingSiteDependency from "dependencies/settlementbuildingsite";

let ApplicationSettlement = function() {
	this.eventListener = {
		beforeCreate: [],
		afterCreate: [],
		afterIdentification: []
	};

	/**
	 * maximale Lagermenge
	 *
	 * @type {float}
	 */
	this.storageCapacity = 0.0;

	/**
	 * maximale Bauplaetze
	 *
	 * @type {int}
	 */
	this.buildingSite = 0;
};

// Konstanten Definition
ApplicationSettlement.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';
ApplicationSettlement.prototype.EVENT_AFTER_CREATE = 'afterCreate';
ApplicationSettlement.prototype.EVENT_AFTER_IDENTIFICATION = 'afterIdentification';

// Einbindung Mixins
Object.assign(ApplicationSettlement.prototype, SerializableMixin);
Object.assign(ApplicationSettlement.prototype, EventMixin);

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

export default ApplicationSettlement;