'use strict';

import ResourceValue from './value';

let ResourceCollection = function() {

	/**
	 * @var {object}
	 */
	this.resources = {};

	/**
	 * @var {float}
	 */
	this.maxValue = 0.0;

	/**
	 * @var {int}
	 */
	this.maxResources = null;
};

/**
 * Fuegt ein ResourceValue Objekt der Collection hinzu
 *
 * @param {object} ResourceValue
 */
ResourceCollection.prototype.setResource = function(value) {
	this.resources[value.qcn] = value;
};

/**
 * Fuellt die Collection anhand eines JSON Objekts
 * 
 * @param {object} json
 */
ResourceCollection.prototype.fill = function(json) {
	let collection = this;

	_.forEach(json, function(value, qcn) {
		collection.setResource(new ResourceValue(qcn, value));
	});
};

/**
 * Serialisiert die Collection zu einem JSON Objekt
 *
 * @return {object}
 */
ResourceCollection.prototype.toJson = function() {
	let json = {};

	_.forEach(this.resources, function(resource, qcn) {
		json[qcn] = resource.value;
	});

	return json;
};

export default ResourceCollection;