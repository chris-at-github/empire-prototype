'use strict';

import Application from 'objects/application';
import SettlementResourceDependency from "dependencies/settlementresource";
import SettlementBuildingSiteDependency from "dependencies/settlementbuildingsite";
import BuildingMixin from 'mixins/object/building';

let LivingRoom = function() {
	Application.call(this);

	this.qcn = 'building.livingRoom';
	this.name = 'Wohnraum';
	this.constructionPoints = 700;

	this.intialize();
	this.initializeBuilding();
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
LivingRoom.prototype = Object.create(Application.prototype);

// Einbindung Mixins
Object.assign(LivingRoom.prototype, BuildingMixin);

/**
 * Definition von Event Listenern und Abhaengigkeiten
 *
 * @return {void}
 */
LivingRoom.prototype.intialize = function() {
	this.addDependency(new SettlementResourceDependency('resource.stone', 3));
	this.addDependency(new SettlementResourceDependency('resource.wood', 3));
	this.addDependency(new SettlementBuildingSiteDependency(1));
};

/**
 * Einheitenkapazitaet, die dieses Gebaeude zur Verfuegng stellt
 *
 * @return {number}
 */
LivingRoom.prototype.getUnitCapacity = function() {
	if(this.constructionState === this.CONSTRUCTION_STATE_CREATED) {
		return 12;
	}

	return 0;
};

export default LivingRoom;