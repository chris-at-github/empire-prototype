'use strict';

import SettlementFactory from './settlement';
import ObjectFactory from './object';

let factories = {
	settlement: new SettlementFactory(),
	object: new ObjectFactory()
};

export default factories;