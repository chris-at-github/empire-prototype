'use strict';

let ApplicationSettlement = function() {
	this.eventListener = {
		beforeCreate: [],
		afterCreate: []
	};

	this.properties = ['id'];
};

// Konstanten Definition
ApplicationSettlement.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';
ApplicationSettlement.prototype.EVENT_AFTER_CREATE = 'afterCreate';

/**
 * fuellt ein Objekt mit den unter this.properties definierten Eigenschaften
 *
 * @param {object} properties
 * @return {void}
 */
ApplicationSettlement.prototype.fill = function(properties) {
	let settlement = this;

	_.forEach(properties, function(property, key) {
		if(_.includes(settlement.properties, key) === true) {
			settlement[key] = property;
		}
	});
};

/**
 * Registriert einen Event Listener und speichert den Callback in einem Array
 * 
 * @param {string} event 
 * @param {function} callback 
 * @return {void}
 */
ApplicationSettlement.prototype.listen = function(event, callback) {
	if(_.isUndefined(this.eventListener[event]) === false) {
		this.eventListener[event].push(callback);
	}
};

/**
 * Fuehrt alle Events (Callbacks) in einer Eventgruppe aus
 * 
 * @param {string} event 
 * @return {void}
 */
ApplicationSettlement.prototype.fire = function(event) {
	let settlement = this;

	_.forEach(this.eventListener[event], function(callback) {
		callback.call(settlement);
	});
};

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