'use strict';

let EmpireAction = function(options = {}) {

	/**
	 * Name der Action
	 *
	 * @type {string}
	 */
	this.name = '';

	/**
	 * Benennung des Buttons
	 *
	 * @type {string}
	 */
	this.label = '';

	/**
	 * Callback Funktion fuer die Abfrage ob die Aktion verfuegbar ist
	 *
	 * @type {function}
	 */
	this.onEnabled = function() {
		return true;
	};

	/**
	 * Callback Funktion fuer die Abfrage ob die Aktion sichtbar ist
	 */
	this.onVisible = function() {
		return true;
	};

	/**
	 * Callback Funktion fuer die Durchfuehrung der Aktion
	 */
	this.onExecute = function() {
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

	if(_.isUndefined(options.label) === false) {
		this.label = options.label;
	}

	if(_.isUndefined(options.onEnabled) === false) {
		this.onEnabled = options.onEnabled;
	}

	if(_.isUndefined(options.onVisible) === false) {
		this.onVisible = options.onVisible;
	}

	if(_.isUndefined(options.onExecute) === false) {
		this.onExecute = options.onExecute;
	}
};

/**
 * @return {string}
 */
EmpireAction.prototype.getName = function() {
	return this.name;
};

/**
 * @return {string}
 */
EmpireAction.prototype.getLabel = function() {
	return this.label;
};

/**
 * @return {boolean}
 */
EmpireAction.prototype.isEnabled = function() {
	return this.onEnabled();
};

/**
 * @return {boolean}
 */
EmpireAction.prototype.isVisible = function() {
	return this.onVisible();
};

/**
 * @return {*}
 */
EmpireAction.prototype.execute = function() {
	return this.onExecute();
};

export default EmpireAction;