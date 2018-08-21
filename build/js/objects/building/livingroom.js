'use strict';

import Application from 'objects/application';
import SettlementResourceDependency from "dependencies/settlementresource";
import SettlementBuildingSiteDependency from "dependencies/settlementbuildingsite";
import BuildingMixin from 'mixins/object/building';

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

// Einbindung Mixins
Object.assign(LivingRoom.prototype, BuildingMixin);

/**
 * Definition von Event Listenern und Abhaengigkeiten
 *
 * @return {void}
 */
LivingRoom.prototype.intialize = function() {
	this.listen(this.EVENT_AFTER_CREATE, this.processDependencyResources);

	this.addDependency(new SettlementResourceDependency('resource.stone', 3));
	this.addDependency(new SettlementResourceDependency('resource.wood', 3));
	this.addDependency(new SettlementBuildingSiteDependency(1));
};

export default LivingRoom;