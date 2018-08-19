'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import DependencyMixin from 'mixins/object/dependency';

let ApplicationObject = function() {

	// Definition von Eigenschaften ueberschreiben
	this.properties = ['id', 'name', 'parent'];
	this.name = null;

	// Zuruecksetzen der Abhaengigkeiten -> ueber das Mixin ist es sonst eine globale Variable
	this.dependencies = [];

	this.eventListener = {
		afterCreate: []
	};
};

// Konstanten Definition
ApplicationObject.prototype.EVENT_AFTER_CREATE = 'afterCreate';

// Einbindung Mixins
Object.assign(ApplicationObject.prototype, SerializableMixin);
Object.assign(ApplicationObject.prototype, EventMixin);
Object.assign(ApplicationObject.prototype, DependencyMixin);

/**
 * Wird VOR dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {boolean}
 */
ApplicationObject.prototype.beforeCreate = function() {
	this.fire(this.EVENT_BEFORE_CREATE);
	return true;
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
ApplicationObject.prototype.getName = function(object) {
	return this.name;
};

export default ApplicationObject;