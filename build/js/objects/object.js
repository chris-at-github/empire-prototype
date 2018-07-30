'use strict';

let object = {};

// ---------------------------------------------------------------------------------------------------------------------
// Settlement
import ColonySettlement from './settlement/colony';

object.settlement = {
	colony: ColonySettlement
};

// ---------------------------------------------------------------------------------------------------------------------
// Building
import EntranceBulding from './building/entrance';
import LivingRoomBuilding from './building/livingroom';

object.building = {
	entrance: EntranceBulding,
	livingRoom: LivingRoomBuilding
};

export default object;