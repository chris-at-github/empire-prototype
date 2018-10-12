'use strict';

// Basisklasse
import expedition from './empire';

// Expeditions-Typen
expedition.TYPE_SEARCH = 'expedition.type.search';
expedition.TYPE_TARGET = 'expedition.type.target';

// Expeditions-Status
expedition.STATE_SEARCH = 'expedition.state.search';
expedition.STATE_MOVE_TO_SEARCH = 'expedition.state.moveToSearch';
expedition.STATE_MOVE_TO_TARGET = 'expedition.state.moveToTarget';
expedition.STATE_RETURN_TO_SETTLEMENT = 'expedition.state.returnToSettlement';
expedition.STATE_ON_HOLD = 'expedition.state.onHold';
expedition.STATE_UNLOAD = 'expedition.state.unload';
expedition.STATE_UNLOAD_ON_HOLD = 'expedition.state.unloadOnHold';

export default expedition;