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

ResourceValue.prototype.getResource = function() {
	if(this.resource === null) {
		this.resource = Empire.factory.resource.create(this.qcn);
	}

	return this.resource;
};

export default ResourceValue;