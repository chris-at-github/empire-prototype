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

object.building = {
	entrance: EntranceBulding
};

export default object;