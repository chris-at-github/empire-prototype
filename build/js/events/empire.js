'use strict';

import _ from 'lodash';
import EventMixin from 'mixins/object/event';

let EmpireEvent = function() {
	this.element = document.body;
	this.eventListener = {};
};

// Konstanten Definition
EmpireEvent.prototype.EVENT_BEFORE_TURN = 'beforeTurn';
EmpireEvent.prototype.EVENT_AFTER_TURN = 'afterTurn';

// Einbindung Mixins
Object.assign(EmpireEvent.prototype, EventMixin);

if(_.isUndefined(Empire.event) === true) {
	Empire.event = new EmpireEvent();
}

export default null;