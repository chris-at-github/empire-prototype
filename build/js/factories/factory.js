'use strict';

import SettlementFactory from './settlement';
import ObjectFactory from './object';
import ResourceFactory from './resource';
import UnitFactory from './unit';
import ExpeditionFactory from './expedition';

let factories = {
	settlement: new SettlementFactory(),
	object: new ObjectFactory(),
	resource: new ResourceFactory(),
	unit: new UnitFactory(),
	expedition: new ExpeditionFactory()
};

export default factories;