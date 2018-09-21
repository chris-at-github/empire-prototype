'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import DependencyMixin from 'mixins/object/dependency';

let ApplicationObject = function() {

	// Definition von Eigenschaften ueberschreiben
	this.properties = ['id', 'name', 'parent', 'constructionState', 'constructionPointsCreated'];
	this.name = null;

	// Zuruecksetzen der Abhaengigkeiten | Event-Listener -> ueber das Mixin ist es sonst eine globale Variable
	this.dependencies = [];
	this.eventListener = {};

	this._initialize();
};

// Konstanten Definition
// Events
ApplicationObject.prototype.EVENT_AFTER_CREATE = 'afterCreate';

// Status
ApplicationObject.prototype.CONSTRUCTION_STATE_PLANNED = 10;
ApplicationObject.prototype.CONSTRUCTION_STATE_UNDER_CONSTRUCTION = 20;
ApplicationObject.prototype.CONSTRUCTION_STATE_CREATED = 30;

// Einbindung Mixins
Object.assign(ApplicationObject.prototype, SerializableMixin);
Object.assign(ApplicationObject.prototype, EventMixin);
Object.assign(ApplicationObject.prototype, DependencyMixin);

/**
 * Initialisierung
 *
 * @return {void}
 */
ApplicationObject.prototype._initialize = function() {
};

/**
 * Wird VOR dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {void}
 */
ApplicationObject.prototype.beforeCreate = function() {
	this.fire(this.EVENT_BEFORE_CREATE);
};

/**
 * Wird NACH dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {void}
 */
ApplicationObject.prototype.afterCreate = function() {
	this.fire(this.EVENT_AFTER_CREATE);
};

/**
 * Setzen der Id als Methode -> damit ein feuern Nach-Id-Setzen Events moeglich ist
 *
 * @param {int} id
 */
ApplicationObject.prototype.setId = function(id) {
	this.id = id;
};

/**
 * Liefert den fest hinterlegten Namen des Objekts
 *
 * @return string
 */
ApplicationObject.prototype.getName = function() {
	return this.name;
};

export default ApplicationObject;