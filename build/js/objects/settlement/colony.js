'use strict';

import ApplicationSettlement from './application';
import BuildingObjectStore from 'managers/storage/building';
import ResourceCollection from 'resources/collection';

let ColonySettlement = function() {
	
	// Parent constructor
	ApplicationSettlement.call(this);

	// Qualified class name
	this.qcn = 'settlement.colony';

	// Definiere Resourcen als in Instanz von ResourceCollection und lege die maximale Speichermenge fest
	// die Befuellung erfolgt ueber die Fill-Methode oder einen direkten Setter
	this.resources = new ResourceCollection();

	// Definition von Eigenschaften ueberschreiben
	this.properties = ['id', 'name', 'resources'];

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
	this.listen(this.EVENT_AFTER_CREATE, this.createInitalBuilding);
	this.listen(this.EVENT_AFTER_CREATE, this.fillInitalResources);
	this.listen(this.EVENT_AFTER_IDENTIFICATION, this.setResourceCollectionMaxValue);
};

/**
 * Setzt das maximale Speicherlimit in der ResourceCollection -> ist erst nach dem setzen der Id moeglich
 */
ColonySettlement.prototype.setResourceCollectionMaxValue = function() {
	this.resources.setMaxValue(this.getStorageCapacity());
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
ColonySettlement.prototype.getStorageCapacity = function() {
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

/**
 * fuegt die Gebaeude (Eingang), die direkt nach der Erstellung vorhanden sein sollen hinzu
 */
ColonySettlement.prototype.fillInitalResources = function() {

	// die Lagerkapazitaet des Eingangs mit einberechnen
	this.setResourceCollectionMaxValue();

	this.resources.fill({
		'resource.water': 10,
		'resource.stone': 10,
		'resource.wood': 10,
		'resource.food': 10
	});
};

export default ColonySettlement;