'use strict';

// Basisklasse
import expedition from './empire';

// Expeditions-Typen
expedition.TYPE_SEARCH = 'expedition.type.search';
expedition.TYPE_TARGET = 'expedition.type.target';

// Expeditions-Status
expedition.STATE_SEARCH = 'expedition.state.search';
expedition.STATE_MOVE_TO_TARGET = 'expedition.state.moveToTarget';
expedition.STATE_RETURN_TO_SETTLEMENT = 'expedition.state.returnToSettlement';

export default expedition;