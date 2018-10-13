'use strict';

let ResourceValue = function(qcn, value) {

	/**
	 * @var {string}
	 */
	this.qcn = qcn;
	
	/**
	 * @var {ApplicationResource}
	 */
	this.resource = null;

	/**
	 * @var {number}
	 */
	this.value = value;
};

/**
 * erstellt eine Instanz zur Original Resource
 * 
 * @return {ApplicationResource}
 */
ResourceValue.prototype.getResource = function() {
	if(this.resource === null) {
		this.resource = Empire.factory.resource.create(this.qcn);
	}

	return this.resource;
};

/**
 * @return {string} qcn
 */
ResourceValue.prototype.getQcn = function() {
	return this.qcn;
};

/**
 * @return {number} value
 */
ResourceValue.prototype.getValue = function() {
	return this.value;
};

/**
 * addiert eine Resourcen Anzahl zur bestehenden Menge dazu
 * 
 * @param {ResourceValue} value 
 */
ResourceValue.prototype.addValue = function(value) {
	this.value = this.value + value.value;
};

/**
 * subtrahiert eine Resourcen Anzahl von einer bestehenden Menge
 * 
 * @param {ResourceValue} value 
 */
ResourceValue.prototype.subValue = function(value) {
	this.value = this.value - value.value;
};

export default ResourceValue;