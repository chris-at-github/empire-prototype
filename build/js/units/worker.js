'use strict';

import EmpireUnit from './empire';

let WorkerUnit = function() {
	EmpireUnit.call(this);

	this.qcn = 'unit.worker';
	this.name = 'Arbeiter';

	this.intialize();
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
WorkerUnit.prototype = Object.create(EmpireUnit.prototype);

/**
 * Definition von Event Listenern und Abhaengigkeiten
 *
 * @return {void}
 */
WorkerUnit.prototype.intialize = function() {
};

export default WorkerUnit;