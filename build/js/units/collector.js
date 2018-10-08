'use strict';

import EmpireUnit from './empire';

let CollectorUnit = function() {
	EmpireUnit.call(this);

	/**
	 * Qualifed Class Name
	 *
	 * @type {string}
	 */
	this.qcn = 'unit.collector';

	/**
	 * Offizielle Bezeichnung
	 *
	 * @type {string}
	 */
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

/**
 * berechnet die AP, die noetig sind um eine Suchaktion durchzufuehren
 *
 * @return {int}
 */
CollectorUnit.prototype.getSearchActionPoints = function() {
	return 40;
};

export default CollectorUnit;