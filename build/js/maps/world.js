'use strict';

import EmpireMap from './empire';

let WorldMap = function() {
	EmpireMap.call(this);

	/**
	 * Qualifed class name
	 *
	 * @type {string}
	 */
	this.qcn = 'map.world';

	// Initialisierung
	this.initialize();
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
WorldMap.prototype = Object.create(EmpireMap.prototype);

/**
 * Initialisierung
 *
 * @return {void}
 */
WorldMap.prototype.initialize = function() {
};

export default WorldMap;