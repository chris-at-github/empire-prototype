'use strict';

import SettlementFactory from './settlement';
import ObjectFactory from './object';
import ResourceFactory from './resource';

let factories = {
	settlement: new SettlementFactory(),
	object: new ObjectFactory(),
	resource: new ResourceFactory()
};

export default factories;