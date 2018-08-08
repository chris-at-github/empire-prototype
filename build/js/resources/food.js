'use strict';

import ApplicationResource from './application';

let FoodResource = function() {
	
	// Parent constructor
	ApplicationResource.call(this);

	// Qualified class name
	this.qcn = 'resource.food';

	// Name
	this.name = 'Nahrung';
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationSettlement}
 */
FoodResource.prototype = Object.create(ApplicationResource.prototype);

export default FoodResource;