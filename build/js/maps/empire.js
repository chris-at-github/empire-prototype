'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import ActionMixin from 'mixins/object/action';

let EmpireMap = function() {

	/**
	 * Definition von Eigenschaften ueberschreiben
	 *
	 * @type {string[]}
	 */
	this.properties = ['id'];

	/**
	 * Zuruecksetzen der Event-Listener -> ueber das Mixin ist es sonst eine globale Variable
	 *
	 * @type {object}
	 */
	this.eventListener = {};

	// Initialisierung
	this._initialize();
};

// Einbindung Mixins
Object.assign(EmpireMap.prototype, SerializableMixin);
Object.assign(EmpireMap.prototype, EventMixin);
Object.assign(EmpireMap.prototype, ActionMixin);

/**
 * Initialisierung
 *
 * @return {void}
 */
EmpireMap.prototype._initialize = function() {
};

export default EmpireMap;