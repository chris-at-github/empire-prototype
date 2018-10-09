'use strict';

let EmpireAction = function(options = {}) {

	/**
	 * Name der Action
	 *
	 * @type {string}
	 */
	this.name = '';

	/**
	 * Callback Funktion fuer die Abfrage ob die Action verfuegbar ist
	 *
	 * @type {function}
	 */
	this.enabled = function() {
		return true;
	};

	/**
	 * Callback Funktion fuer die Abfrage ob die Action sichtbar ist
	 */
	this.visible = function() {
		return true;
	};

	// Initialisierung
	this.initialize(options);
};
/**
 * Initialisierung
 *
 * @param {object} options
 * @return {void}
 */
EmpireAction.prototype.initialize = function(options) {
	if(_.isUndefined(options.name) === false) {
		this.name = options.name;
	}

	if(_.isUndefined(options.enabled) === false) {
		this.enabled = options.enabled;
	}

	if(_.isUndefined(options.visible) === false) {
		this.visible = options.visible;
	}
};

EmpireAction.prototype.getName = function() {
	return this.name;
};

EmpireAction.prototype.isEnabled = function() {
};

EmpireAction.prototype.isVisible = function() {
};

export default EmpireAction;