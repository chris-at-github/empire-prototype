'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import ExpeditionStorage from 'managers/storage/expedition';
import ResourceCollection from 'resources/collection';

let EmpireExpedition = function() {

	/**
	 * Definition von Eigenschaften ueberschreiben
	 *
	 * @type {string[]}
	 */
	this.properties = ['id', 'type', 'state', 'unit', 'settlement', 'resources'];

	/**
	 * Zuruecksetzen der Event-Listener -> ueber das Mixin ist es sonst eine globale Variable
	 *
	 * @type {object}
	 */
	this.eventListener = {};

	/**
	 * Typ der Expedition: Suche oder direktes Ziel
	 *
	 * @type {string}
	 */
	this.type = null;

	/**
	 * Status der aktuellen Expedition
	 *
	 * @type {string}
	 */
	this.state = null;

	/**
	 * Eingesetzte Einheit
	 *
	 * @type {object} CollectorUnit
	 */
	this.unit = null;

	/**
	 * Basis der Expedition
	 *
	 * @type {object} ApplicationSettlement
	 */
	this.settlement = null;

	/**
	 * gefundene Resourcen
	 *
	 * @type {object} ResourceCollection
	 */
	this.resources = new ResourceCollection();

	// Initialisierung
	this.initialize();
};

// Einbindung Mixins
Object.assign(EmpireExpedition.prototype, SerializableMixin);
Object.assign(EmpireExpedition.prototype, EventMixin);

/**
 * Initialisierung
 *
 * @return {void}
 */
EmpireExpedition.prototype.initialize = function() {
	this.resources.setMaxValue(1);
	this.resources.setMaxResources(1);
};

/**
 * Wird VOR dem Einfuegen der Expedition ausgefuehrt
 *
 * @return {void}
 */
EmpireExpedition.prototype.beforeCreate = function() {
	this.fire(Empire.event.EVENT_BEFORE_CREATE);
};

/**
 * Wird NACH dem Einfuegen der Expedition ausgefuehrt
 *
 * @return {void}
 */
EmpireExpedition.prototype.afterCreate = function() {
	this.fire(Empire.event.EVENT_AFTER_CREATE);
};

/**
 * Speichert die aktuelle Expedition
 *
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.store = function() {
	let storage = new ExpeditionStorage();
			storage.store(this);

	return this;
};

/**
 * Setzen der Id als Methode -> damit ein feuern Nach-Id-Setzen Events moeglich ist
 *
 * @param {int} id
 */
EmpireExpedition.prototype.setId = function(id) {
	this.id = id;
};

/**
 * Liefert ein Unit Objekt zurueck
 *
 * @return {object} CollectorUnit
 */
EmpireExpedition.prototype.getUnit = function() {
	return this.unit;
};

/**
 * Wird aufgerufen bevor das Objekt mit Daten befuellt wird
 *
 * @param {string} id
 * @return {void}
 */
EmpireExpedition.prototype.beforeUnitFill = function(id) {
	if(_.isUndefined(Game.units[id]) === false) {
		let data = Game.units[id];

		this.unit = Empire.factory.unit.create(data.qcn);
		this.unit.fill(data);
	}
};

/**
 * Wird aufgerufen bevor das (Einheiten-) Objekt zu einem JSON Objekt umgewandelt wird
 *
 * @return {string|null} id
 */
EmpireExpedition.prototype.beforeUnitToJson = function() {
	if((this.unit instanceof Empire.unit.collector) === true) {
		return this.unit.id;
	}

	return null;
};

/**
 * Liefert ein Settlement Objekt zurueck
 *
 * @return {object} ApplicationSettlement
 */
EmpireExpedition.prototype.getSettlement = function() {
	return this.settlement;
};

/**
 * Wird aufgerufen bevor das Objekt mit Daten befuellt wird
 *
 * @param {string} id
 * @return {void}
 */
EmpireExpedition.prototype.beforeSettlementFill = function(id) {
	if(_.isUndefined(Game.settlements[id]) === false) {
		let data = Game.settlements[id];

		this.settlement = Empire.factory.settlement.create(data.qcn);
		this.settlement.fill(data);
	}
};

/**
 * Wird aufgerufen bevor das (Siedlungs-) Objekt zu einem JSON Objekt umgewandelt wird
 *
 * @return {string|null} id
 */
EmpireExpedition.prototype.beforeSettlementToJson = function() {
	if((this.settlement instanceof Empire.object.settlement.colony) === true) {
		return this.settlement.id;
	}

	return null;
};

/**
 * Liefert die Resource Collection zurueck
 *
 * @return {object} ResourceCollection
 */
EmpireExpedition.prototype.getResources = function() {
	return this.resources;
};



export default EmpireExpedition;