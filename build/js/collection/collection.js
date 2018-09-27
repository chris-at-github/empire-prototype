'use strict';

let Collection = function() {

	/**
	 * @var {object}
	 */
	this.items = {};
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

export default Collection;