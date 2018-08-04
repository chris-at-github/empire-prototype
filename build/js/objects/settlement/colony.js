'use strict';

import ApplicationSettlement from './application';
import BuildingObjectStore from 'managers/storage/building';

let ColonySettlement = function() {
	
	// Parent constructor
	ApplicationSettlement.call(this);

	// Qualified class name
	this.qcn = 'settlement.colony';

	// Definition von Eigenschaften ueberschreiben
	this.properties = ['id', 'name'];

	// Event Listener registrieren
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
	// this.listen(this.EVENT_BEFORE_CREATE, this.testBeforeCreate);

	this.listen(this.EVENT_AFTER_CREATE, this.createInitalBuilding);
};

ColonySettlement.prototype.testBeforeCreate = function() {
	console.log('ColonySettlement::beforeCreate');
};

/**
 * fuegt die Gebaeude (Eingang), die direkt nach der Erstellung vorhanden sein sollen hinzu
 */
ColonySettlement.prototype.createInitalBuilding = function() {

	// @todo: sollte hier mit dem richtigen Objekt gearbeitet werden?
	let objectStorage = new BuildingObjectStore();
	let entrance = Empire.factory.object.create('building.entrance');

	entrance.fill({
		parent: this.id
	});

	objectStorage.store(entrance);
};

export default ColonySettlement;