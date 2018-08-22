'use strict';

import ScreenManager from './screen';
import ActivateManager from './activate';
import TurnManager from './turn';

let managers = {
	screen:   new ScreenManager(),
	activate: new ActivateManager(),
	turn: new TurnManager()
};

export default managers;