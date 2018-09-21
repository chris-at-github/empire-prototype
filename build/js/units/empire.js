'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';

let EmpireUnit = function() {

	// Definition von Eigenschaften ueberschreiben
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

export default EmpireUnit;