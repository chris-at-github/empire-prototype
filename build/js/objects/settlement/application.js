'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';

let ApplicationSettlement = function() {
	this.eventListener = {
		beforeCreate: [],
		afterCreate: []
	};
};

// Konstanten Definition
ApplicationSettlement.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';
ApplicationSettlement.prototype.EVENT_AFTER_CREATE = 'afterCreate';

// Einbindung Mixins
Object.assign(ApplicationSettlement.prototype, SerializableMixin);
Object.assign(ApplicationSettlement.prototype, EventMixin);

/**
 * Wird VOR dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {boolean}
 */
ApplicationSettlement.prototype.beforeCreate = function() {
	this.fire(this.EVENT_BEFORE_CREATE);
	return true;
};

/**
 * Wird NACH dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {void}
 */
ApplicationSettlement.prototype.afterCreate = function() {
	this.fire(this.EVENT_AFTER_CREATE);
};

export default ApplicationSettlement;