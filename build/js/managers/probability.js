'use strict';

let ProbabilityManager = function() {

	/**
	 * Liste mit den moeglichen Optionen
	 *
	 * @type {array}
	 */
	this.options = [];

	/**
	 * Liste mit den moeglichen Callbacks
	 *
	 * @type {array}
	 */
	this.callbacks = [];
};

/**
 * @param {function} callback
 * @param {int} factor
 * @return {object} ProbabilityManager
 */
ProbabilityManager.prototype.add = function(callback, factor = 1) {
	let index = this.addCallback(callback);

	for(let i = 0; i < factor; i++) {
		this.options.push(index);
	}

	return this;
};

/**
 * @param {function} callback
 * @return {int}
 */
ProbabilityManager.prototype.addCallback = function(callback) {
	this.callbacks.push(callback);

	return _.size(this.callbacks) - 1;
};

/**
 * @see: https://www.blitzrechner.de/prozent/#grundwert
 * @see: https://www.w3schools.com/jsref/jsref_random.asp
 * @param {int} probability
 * @return {*}
 */
ProbabilityManager.prototype.execute = function(probability = 0) {
	let result = Math.floor((Math.random() * ((this.options.length / probability) * 100)));

	if(this.options.indexOf(result) !== -1) {
		return this.callbacks[this.options[result]]();
	}

	return null;
};

export default ProbabilityManager;