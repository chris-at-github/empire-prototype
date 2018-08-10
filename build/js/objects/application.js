'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';

let ApplicationObject = function() {
	// Definition von Eigenschaften ueberschreiben
	this.properties = ['id', 'name', 'parent'];
	this.name = null;
};

// Einbindung Mixins
Object.assign(ApplicationObject.prototype, SerializableMixin);
Object.assign(ApplicationObject.prototype, EventMixin);

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