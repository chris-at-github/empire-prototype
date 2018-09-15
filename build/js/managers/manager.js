'use strict';

import ScreenManager from './screen';
import ActivateManager from './activate';
import TurnManager from './turn';

import BuildingFinder from './finder/building';

let managers = {
	screen:   new ScreenManager(),
	activate: new ActivateManager(),
	turn: new TurnManager(),

	finder: {
		building: new BuildingFinder()
	}
};

export default managers;