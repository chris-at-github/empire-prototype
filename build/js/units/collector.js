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

/**
 * Prueft ob eine Suchaktion moeglich ist -> reichen die bestehenden AP fuer einen neuen Vorgang aus?
 *
 * @return {boolean}
 */
CollectorUnit.prototype.searchEnabled = function() {

	// @todo AP zur Bewegung auslesen, siehe todo EmpireUnit::getMoveActionPoints
	// @todo AP zur Suchaktion auslesen this.getSearchActionPoints()
	// @todo Pruefung: moveAp + searchAp > unitAp -> return false

	return true;
};

/**
 * berechnet die AP, die noetig sind um eine Suchaktion durchzufuehren
 *
 * @return {int}
 */
CollectorUnit.prototype.getSearchActionPoints = function() {
	return 50;
};

export default CollectorUnit;