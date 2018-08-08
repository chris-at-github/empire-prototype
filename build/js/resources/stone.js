'use strict';

import ApplicationResource from './application';

let StoneResource = function() {
	
	// Parent constructor
	ApplicationResource.call(this);

	// Qualified class name
	this.qcn = 'resource.stone';

	// Name
	this.name = 'Stein';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationSettlement}
 */
StoneResource.prototype = Object.create(ApplicationResource.prototype);

export default StoneResource;