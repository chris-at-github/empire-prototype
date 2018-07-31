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
};

ColonySettlement.prototype.testBeforeCreate = function() {
	console.log('ColonySettlement::testBeforeCreate');
};

export default ColonySettlement;