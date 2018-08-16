'use strict';

import Application from 'objects/application';
import SettlementBuildingSiteDependency from "dependencies/settlementbuildingsite";

let LivingRoom = function() {
	Application.call(this);

	this.qcn = 'building.livingRoom';
	this.name = 'Wohnraum';

	this.intialize();
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
LivingRoom.prototype = Object.create(Application.prototype);

/**
 * Definition von Event Listenern und Abhaengigkeiten
 *
 * @return {void}
 */
LivingRoom.prototype.intialize = function() {
	this.addDependency(new SettlementBuildingSiteDependency(1));
};

export default LivingRoom;