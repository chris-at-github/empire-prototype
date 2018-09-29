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

/**
 * Liefert die Erstellungsrate (= Faktor Construction Points zu Action Points)
 *
 * @return {number}
 */
WorkerUnit.prototype.getConstructionRate = function() {
	return 0.5;
};

export default WorkerUnit;