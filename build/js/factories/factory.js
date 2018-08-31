'use strict';

import SettlementFactory from './settlement';
import ObjectFactory from './object';
import ResourceFactory from './resource';
import UnitFactory from './unit';

let factories = {
	settlement: new SettlementFactory(),
	object: new ObjectFactory(),
	resource: new ResourceFactory(),
	unit: new UnitFactory()
};

export default factories;