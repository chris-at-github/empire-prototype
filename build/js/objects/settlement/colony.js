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
	let objectStorage = new BuildingObjectStore();
	let entrance = Empire.factory.object.create('building.entrance');

	entrance.fill({
		parent: this.id
	});

	objectStorage.store(entrance);
};

/**
 * Berechnet den verfuegbaren Lagerplatz fuer Rohstoffe
 *
 * @return {float}
 */
ApplicationSettlement.prototype.getStorageCapacity = function() {
	let storageCapacity = 0.0;

	// Berechnung der Lagerkapazitaeten durch die Gebaeude, wenn diese die Methode getStorageCapacity zur
	// Verfuegung stellen
	_.forEach(this.getBuildings(), function(building, id) {
		if(typeof(building['getStorageCapacity']) === 'function') {
			storageCapacity += building.getStorageCapacity();
		}
	});

	return storageCapacity;
};

export default ColonySettlement;