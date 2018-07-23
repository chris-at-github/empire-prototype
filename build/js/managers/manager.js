'use strict';

import ScreenManager from './screen';
import ActivateManager from './activate';

let managers = {
	Screen: new ScreenManager(),
	Activate: new ActivateManager()
};

export default managers;