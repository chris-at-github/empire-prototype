'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';

let EmpireExpedition = function() {

	/**
	 * Definition von Eigenschaften ueberschreiben
	 *
	 * @type {string[]}
	 */
	this.properties = ['id', 'type', 'state', 'unit', 'settlement'];

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
 * Wird aufgerufen bevor das Objekt mit Daten befuellt wird
 *
 * @param {string} id
 * @return {void}
 */
EmpireExpedition.prototype.beforeUnitFill = function(id) {
	console.log(id);
};

/**
 * Wird aufgerufen bevor das Objekt zu einem JSON Objekt umgewandelt wird
 *
 * @return {*}
 */
EmpireExpedition.prototype.beforeUnitToJson = function() {
};

/**
 * Setzen der Id als Methode -> damit ein feuern Nach-Id-Setzen Events moeglich ist
 *
 * @param {int} id
 */
EmpireExpedition.prototype.setId = function(id) {
	this.id = id;
};



export default EmpireExpedition;