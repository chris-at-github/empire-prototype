'use strict';

import ScreenManager from './screen';
import ActivateManager from './activate';
import TurnManager from './turn';

import ObjectManager from './object';
import UnitManager from './unit';

let managers = {
	screen:   new ScreenManager(),
	activate: new ActivateManager(),
	turn: new TurnManager(),

	object: new ObjectManager(),
	unit: new UnitManager()
};

export default managers;