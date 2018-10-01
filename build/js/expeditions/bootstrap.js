'use strict';

// Basisklasse
import expedition from './empire';

// Expeditions-Typen
expedition.TYPE_SEARCH = 'expedition.search';
expedition.TYPE_TARGET = 'expedition.target';

// Expeditions-Status
expedition.STATE_SEARCH = 'expedition.search';
expedition.STATE_MOVE_TO_TARGET = 'expedition.moveToTarget';
expedition.STATE_RETURN_TO_SETTLEMENT = 'expedition.returnToSettlement';

export default expedition;