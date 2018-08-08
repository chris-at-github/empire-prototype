'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';

let ApplicationSettlement = function() {
	this.eventListener = {
		beforeCreate: [],
		afterCreate: []
	};

	/**
	 * maximale Lagermenge
	 *
	 * @type {float}
	 */
	this.storageCapacity = 0.0;
};

// Konstanten Definition
ApplicationSettlement.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';
ApplicationSettlement.prototype.EVENT_AFTER_CREATE = 'afterCreate';

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

export default ApplicationSettlement;