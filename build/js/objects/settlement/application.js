'use strict';

let ApplicationSettlement = function() {
	this.eventListener = {
		beforeCreate: []
	};
};

// Konstanten Definition
ApplicationSettlement.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';

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
 * Liefert den fest hinterlegten Namen des Objekts
 *
 * @return {boolean}
 */
ApplicationSettlement.prototype.beforeCreate = function() {
	this.fire(this.EVENT_BEFORE_CREATE);
	return true;
};

export default ApplicationSettlement;