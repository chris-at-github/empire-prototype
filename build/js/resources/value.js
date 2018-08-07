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
	 * @var {float}
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