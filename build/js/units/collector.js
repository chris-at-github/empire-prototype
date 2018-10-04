'use strict';

import EmpireUnit from './empire';

let CollectorUnit = function() {
	EmpireUnit.call(this);

	this.qcn = 'unit.collector';
	this.name = 'Sammler';

	this.intialize();
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
CollectorUnit.prototype = Object.create(EmpireUnit.prototype);

/**
 * Definition von Event Listenern und Abhaengigkeiten
 *
 * @return {void}
 */
CollectorUnit.prototype.intialize = function() {
};

export default CollectorUnit;