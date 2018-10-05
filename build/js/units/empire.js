'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';

let EmpireUnit = function() {

	/**
	 * Aktionspunkte der Einheit
	 *
	 * @type {number}
	 */
	this.actionPoints = 0;

	/**
	 * Initiale Aktionspunkte, die beim Erstellen und am Rundenanfang gesetzt werden
	 * kann in den Kindobjekten abweichend definiert werden
	 *
	 * @type {number}
	 */
	this.initialActionPoints = 100;

	/**
	 * Definition von Eigenschaften ueberschreiben
	 * @type {string[]}
	 */
	this.properties = ['id', 'name', 'parent', 'actionPoints'];

	// Zuruecksetzen der Event-Listener -> ueber das Mixin ist es sonst eine globale Variable
	this.eventListener = {};

	// Initialisierung
	this._initialize();
};

// Konstanten Definition
EmpireUnit.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';
EmpireUnit.prototype.EVENT_AFTER_CREATE = 'afterCreate';

// Einbindung Mixins
Object.assign(EmpireUnit.prototype, SerializableMixin);
Object.assign(EmpireUnit.prototype, EventMixin);

/**
 * Initialisierung
 *
 * @return {void}
 */
EmpireUnit.prototype._initialize = function() {

	// AP vor Rundenanfang | bei Erstellung wieder auffuellen
	this.listen(this.EVENT_AFTER_CREATE, this.fillUpActionPoints);
	this.listen(Empire.manager.turn.EVENT_BEFORE_TURN, this.fillUpActionPoints);
};

/**
 * Wird VOR dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {boolean}
 */
EmpireUnit.prototype.beforeCreate = function() {
	this.fire(this.EVENT_BEFORE_CREATE);
	return true;
};

/**
 * Wird NACH dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {void}
 */
EmpireUnit.prototype.afterCreate = function() {
	this.fire(this.EVENT_AFTER_CREATE);
};

/**
 * Setzen der Id als Methode -> damit ein feuern Nach-Id-Setzen Events moeglich ist
 *
 * @param {int} id
 */
EmpireUnit.prototype.setId = function(id) {
	this.id = id;
};

/**
 * Liefert die verfuegbaren AP der Einheit
 *
 * @return {int}
 */
EmpireUnit.prototype.getActionPoints = function() {
	return this.actionPoints;
};

/**
 * Setzt die verfuegbaren AP der Einheit
 *
 * @param {int} actionPoints
 * @return {object} unit
 */
EmpireUnit.prototype.setActionPoints = function(actionPoints) {
	this.actionPoints = actionPoints;
	return this;
};

/**
 * Fuellt die AP vor der Runde wieder auf
 *
 * @return {void}
 */
EmpireUnit.prototype.fillUpActionPoints = function() {
	this.actionPoints = this.initialActionPoints;
};

/**
 * Wandelt eine Einheit in einen anderen Typ um
 *
 * @param {string} qcn
 * @return {object} Instanz der neuen Einheit
 */
EmpireUnit.prototype.convert = function(qcn) {
	// @todo: this.setQcn(qcn) -> this.store
	// @todo: neue Instanz ueber Empire.manager.unit.find erstellen und zurueck geben.
	// @todo Entfernung von unnoetigen Eigenschaften (this.properties) noetig?
};

export default EmpireUnit;