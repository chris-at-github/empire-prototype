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

	this.listen(this.EVENT_BEFORE_CREATE, this.testAfterCreate);
};

ColonySettlement.prototype.testBeforeCreate = function() {
	console.log('ColonySettlement::testBeforeCreate');
};

ColonySettlement.prototype.testAfterCreate = function() {
	console.log('ColonySettlement::testAfterCreate');
};

export default ColonySettlement;