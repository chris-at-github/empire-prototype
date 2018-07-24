'use strict';

import ScreenManager from './screen';
import ActivateManager from './activate';

let managers = {
	screen:   new ScreenManager(),
	activate: new ActivateManager()
};

export default managers;