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
ResourceCollection.prototype.setResourceValue = function(value) {
	this.resources[value.qcn] = value;
};

/**
 * Addiert ein ResourceValue Objekt zu einem bestehenden Objekt
 *
 * @param {object} ResourceValue
 */
ResourceCollection.prototype.addResourceValue = function(value) {
	if(_.isUndefined(this.resources[value.qcn]) === false) {
		this.resources[value.qcn].addValue(value);
	}
};

/**
 * Subtrahiert ein ResourceValue Objekt von einem bestehenden Objekt
 *
 * @param {object} ResourceValue
 */
ResourceCollection.prototype.subResourceValue = function(value) {
	if(_.isUndefined(this.resources[value.qcn]) === false) {
		this.resources[value.qcn].subValue(value);
	}
};

/**
 * Fuellt die Collection anhand eines JSON Objekts
 * 
 * @param {object} json
 */
ResourceCollection.prototype.fill = function(json) {
	let collection = this;

	_.forEach(json, function(value, qcn) {
		collection.setResourceValue(new ResourceValue(qcn, value));
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