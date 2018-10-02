'use strict';

import ScreenManager from './screen';
import ActivateManager from './activate';
import TurnManager from './turn';

import ObjectManager from './object';
import UnitManager from './unit';
import ExpeditionManager from './expedition';

let managers = {
	screen:   new ScreenManager(),
	activate: new ActivateManager(),
	turn: new TurnManager(),

	object: new ObjectManager(),
	unit: new UnitManager(),
	expedition: new ExpeditionManager()
};

export default managers;