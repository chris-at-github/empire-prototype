'use strict';

import Application from 'objects/application';
import SettlementBuildingSiteDependency from "dependencies/settlementbuildingsite";
import SettlementBuildingSingletonDependency from "dependencies/settlementbuildingsingleton";

let Entrance = function() {
	Application.call(this);

	this.qcn = 'building.entrance';
	this.name = 'Eingang';

	this.intialize();
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
Entrance.prototype = Object.create(Application.prototype);

/**
 * Definition von Event Listenern und Abhaengigkeiten
 *
 * @return {void}
 */
Entrance.prototype.intialize = function() {
	this.addDependency(new SettlementBuildingSiteDependency(1));
	this.addDependency(new SettlementBuildingSingletonDependency(this));
};

/**
 * Lagerkapazitaet, die dieses Gebaeude zur Verfuegng stellt
 *
 * @return {number}
 */
Entrance.prototype.getStorageCapacity = function() {
	return 10;
};

/**
 * Einheitenkapazitaet, die dieses Gebaeude zur Verfuegng stellt
 *
 * @return {number}
 */
Entrance.prototype.getUnitCapacity = function() {
	return 5;
};

export default Entrance;