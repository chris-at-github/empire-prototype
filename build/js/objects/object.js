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
import StoreRoomBuilding from './building/storeroom';

object.building = {
	entrance: EntranceBulding,
	livingRoom: LivingRoomBuilding,
	storeRoom: StoreRoomBuilding
};

export default object;