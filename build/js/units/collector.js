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

	/**
	 * Vorherige Suchaktion
	 *
	 * @type {string}
	 */
	this.previousSearchState = Empire.expedition.STATE_ON_HOLD;

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
	this.addProperty('previousSearchState');
};

/**
 * Prueft ob eine Suchaktion moeglich ist -> reichen die bestehenden AP fuer einen neuen Vorgang aus?
 *
 * @return {boolean}
 */
CollectorUnit.prototype.isSearchEnabled = function() {

	// Hat sich der Sammler zuvor auf ein neues Feld bewegt und reichen die AP fuer einen erneuten Suchlauf
	if(this.previousSearchState === Empire.expedition.STATE_MOVE_TO_SEARCH && this.getActionPoints() >= this.getSearchActionPoints()) {
		return true;
	}

	// Befindet sich der Sammler im Wartemodus oder hat bereits das Feld abgesucht und reichen die AP fuer eine Bewegung zum naechsten Feld
	if(
		(this.previousSearchState === Empire.expedition.STATE_SEARCH || this.previousSearchState === Empire.expedition.STATE_ON_HOLD) &&
		this.getActionPoints() >= this.getMoveActionPoints())
	{
		return true;
	}

	return false;
};

/**
 * berechnet die AP, die noetig sind um eine Suchaktion durchzufuehren
 *
 * @return {int}
 */
CollectorUnit.prototype.getSearchActionPoints = function() {
	return 50;
};

/**
 * Vorherige Suchaktion
 *
 * @param {string} previousSearchState
 * @return {object} CollectorUnit
 */
CollectorUnit.prototype.setPreviousSearchState = function(previousSearchState) {
	this.previousSearchState = previousSearchState;
	return this;
};

/**
 * Vorherige Suchaktion
 *
 * @return {string} CollectorUnit
 */
CollectorUnit.prototype.getPreviousSearchState = function() {
	return this.previousSearchState;
};

export default CollectorUnit;