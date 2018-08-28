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
 * Setzen der Id als Methode -> damit ein feuern Nach-Id-Setzen Events moeglich ist
 *
 * @param {int} id
 */
EmpireUnit.prototype.setId = function(id) {
	this.id = id;
};

export default EmpireUnit;