'use strict';

let object = {};

// ---------------------------------------------------------------------------------------------------------------------
// Konstanten
object.CONSTRUCTION_STATE_PLANNED = 'object.constructionState.planned';
object.CONSTRUCTION_STATE_UNDER_CONSTRUCTION = 'object.constructionState.underConstruction';
object.CONSTRUCTION_STATE_CREATED = 'object.constructionState.created';

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