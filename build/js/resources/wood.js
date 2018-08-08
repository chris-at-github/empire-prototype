'use strict';

import ApplicationResource from './application';

let WoodResource = function() {
	
	// Parent constructor
	ApplicationResource.call(this);

	// Qualified class name
	this.qcn = 'resource.wood';

	// Name
	this.name = 'Holz';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationSettlement}
 */
WoodResource.prototype = Object.create(ApplicationResource.prototype);

export default WoodResource;