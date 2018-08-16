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
};

// Einbindung Mixins
Object.assign(ApplicationObject.prototype, SerializableMixin);
Object.assign(ApplicationObject.prototype, EventMixin);
Object.assign(ApplicationObject.prototype, DependencyMixin);

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