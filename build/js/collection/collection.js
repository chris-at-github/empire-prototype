'use strict';

let Collection = function(options = {}) {

	/**
	 * @var {object}
	 */
	this.items = {};

	this.initialize(options);
};

/**
 * Initialisierung
 *
 * @param {object} options
 */
Collection.prototype.initialize = function(options) {
	if(typeof(options.fill) === 'function') {
		this.fill = options.fill;
	}
};

/**
 * Fuegt einen neuen Eintrag hinzu
 *
 * @param {mixed} key
 * @param {mixed} value
 * @return {object} Collection
 */
Collection.prototype.set = function(key, value) {
	this.items[key] = value;
	return this;
};

/**
 * Liefert einen Eintrag anhand eines Schluessels
 *
 * @return {mixed}
 */
Collection.prototype.get = function(key) {
	if(_.isUndefined(this.items[key]) === false) {
		return this.items[key];
	}

	return null;
};

/**
 * Fuellt die Collection anhand eines JSON Objekts
 *
 * @param {object} json
 * @return {object} Collection
 */
Collection.prototype.fill = function(json) {
	let collection = this;

	console.log('Collection::fill');

	_.forEach(json, function(value, key) {
		collection.set(key, value);
	});

	return this;
};

/**
 * Serialisiert die Collection zu einem JSON Objekt
 *
 * @return {object}
 */
Collection.prototype.toJson = function() {
	let json = {};

	_.forEach(this.items, function(value, key) {
		json[key] = value;
	});

	return json;
};

/**
 * Liefert alle Eintraege
 *
 * @return {object}
 */
Collection.prototype.all = function() {
	return this.items;
};

/**
 * Entfernt einen Eintrag
 *
 * @param {mixed} key
 * @return {object}
 */
Collection.prototype.remove = function(key) {
	delete this.items[key];

	return this;
};

/**
 * Entfernt alle Eintraege
 *
 * @return {object}
 */
Collection.prototype.empty = function(key) {
	this.items = {};

	return this;
};

/**
 * Liefert die Schluessel aller Eintraege als Array
 *
 * @return {array}
 */
Collection.prototype.keys = function() {
	return _.keys(this.items);
};

export default Collection;