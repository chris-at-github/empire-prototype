'use strict';

import Application from 'objects/application';
import SettlementResourceDependency from "dependencies/settlementresource";
import SettlementBuildingDependency from "dependencies/settlementbuilding";
import SettlementBuildingSiteDependency from "dependencies/settlementbuildingsite";

let StoreRoom = function() {
	Application.call(this);

	this.qcn = 'building.storeRoom';
	this.name = 'Lagerraum';

	this.intialize();
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
StoreRoom.prototype = Object.create(Application.prototype);

/**
 * Definition von Event Listenern und Abhaengigkeiten
 *
 * @return {void}
 */
StoreRoom.prototype.intialize = function() {
	this.addDependency(new SettlementResourceDependency('resource.stone', 3));
	this.addDependency(new SettlementResourceDependency('resource.wood', 3));
	this.addDependency(new SettlementBuildingDependency('building.entrance'));
	this.addDependency(new SettlementBuildingSiteDependency(2));
};

/**
 * Lagerkapazitaet, die dieses Gebaeude zur Verfuegng stellt
 *
 * @return {float}
 */
StoreRoom.prototype.getStorageCapacity = function() {
	return 40;
};

export default StoreRoom;