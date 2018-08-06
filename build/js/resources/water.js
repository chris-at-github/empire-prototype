'use strict';

import ApplicationResource from './application';

let WaterResource = function() {
	
	// Parent constructor
	ApplicationResource.call(this);

	// Qualified class name
	this.qcn = 'resource.water';

	// Name
	this.name = 'Wasser';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationSettlement}
 */
WaterResource.prototype = Object.create(ApplicationResource.prototype);

export default WaterResource;