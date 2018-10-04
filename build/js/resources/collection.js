'use strict';

import ResourceValue from './value';
import ResourceCollectionException from 'exceptions/resourcecollection';

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
 * Setzt das maximale Limit von Resourcen Einheiten
 *
 * @param {number} max
 * @return {object} ResourceCollection
 */
ResourceCollection.prototype.setMaxValue = function(max) {
	this.maxValue = max;
	return this;
};

/**
 * Setzt das maximale Limit von Resourcen Einheiten
 *
 * @param {int} max
 * @return {object} ResourceCollection
 */
ResourceCollection.prototype.setMaxResources = function(max) {
	this.maxResources = max;
	return this;
};

/**
 * prueft ob eine Aktion, die minimale oder maximale Menge ueberschreiten wuerde
 *
 * @throws {ResourceCollectionException}
 * @param {float} value
 * @return {boolean}
 */
ResourceCollection.prototype.checkResourceValue = function(value) {
	if(value > this.maxValue) {
		throw new ResourceCollectionException(ResourceCollectionException.MAX_VALUE);
	}

	if(value < 0) {
		throw new ResourceCollectionException(ResourceCollectionException.MIN_VALUE);
	}

	return true;
};

/**
 * Fuegt ein ResourceValue Objekt der Collection hinzu
 *
 * @param {object} ResourceValue
 */
ResourceCollection.prototype.setResourceValue = function(resource) {
	if(this.checkResourceValue(resource.value) === true) {
		this.resources[resource.qcn] = resource;
	}
};

/**
 * Liefert ein ResourceValue Objekt anhand des QCN zurueck
 *
 * @return {object} ResourceValue
 */
ResourceCollection.prototype.getResourceValue = function(qcn) {
	if(_.isUndefined(this.resources[qcn]) === false) {
		return this.resources[qcn];
	}

	return null;
};

/**
 * Addiert ein ResourceValue Objekt zu einem bestehenden Objekt
 *
 * @param {object} ResourceValue
 */
ResourceCollection.prototype.addResourceValue = function(resource) {
	if(_.isUndefined(this.resources[resource.qcn]) === false) {
		if(this.checkResourceValue(this.resources[resource.qcn].value + resource.value)) {
			this.resources[resource.qcn].addValue(resource);
		}

	} else {
		this.setResourceValue(resource);
	}
};

/**
 * Subtrahiert ein ResourceValue Objekt von einem bestehenden Objekt
 *
 * @param {object} ResourceValue
 */
ResourceCollection.prototype.subResourceValue = function(resource) {
	if(_.isUndefined(this.resources[resource.qcn]) === false) {
		if(this.checkResourceValue(this.resources[resource.qcn].value - resource.value)) {
			this.resources[resource.qcn].subValue(resource);
		}

	} else {
		this.setResourceValue(resource);
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

/**
 * Liefert die Anzahl an Resourcen (nicht Mengen) in der Collection zurueck
 *
 * @return {int}
 */
ResourceCollection.prototype.count = function() {
	return _.size(this.resources);
};

export default ResourceCollection;