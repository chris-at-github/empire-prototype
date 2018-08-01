'use strict';

import ApplicationSettlement from './application';

let ColonySettlement = function() {
	
	// Parent constructor
	ApplicationSettlement.call(this);

	// Initialisieren 
	this.intialize();
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationSettlement}
 */
ColonySettlement.prototype = Object.create(ApplicationSettlement.prototype);

/**
 * Definition von Event Listenern und Abhaengigkeiten
 * 
 * @return {void}
 */
ColonySettlement.prototype.intialize = function() {
	this.listen(this.EVENT_BEFORE_CREATE, this.testBeforeCreate);

	this.listen(this.EVENT_AFTER_CREATE, this.createInitalBuilding);
};

ColonySettlement.prototype.testBeforeCreate = function() {
	console.log('ColonySettlement::testBeforeCreate');
};

ColonySettlement.prototype.createInitalBuilding = function() {
	console.log(this);
};

export default ColonySettlement;