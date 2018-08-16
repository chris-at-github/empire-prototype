'use strict';

import Application from 'objects/application';
import SettlementBuildingSiteDependency from "dependencies/settlementbuildingsite";

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
};

/**
 * Lagerkapazitaet, die dieses Gebaeude zur Verfuegng stellt
 *
 * @return {float}
 */
Entrance.prototype.getStorageCapacity = function() {
	return 10;
};

export default Entrance;