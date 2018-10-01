'use strict';

import _ from 'lodash';

let EmpireEvent = function() {
	this.element = document.body;
	this.eventListener = {};
};

// Konstanten Definition
EmpireEvent.prototype.EVENT_CREATE_APPLICATION = 'createApplication';
EmpireEvent.prototype.EVENT_BEFORE_TURN = 'beforeTurn';
EmpireEvent.prototype.EVENT_AFTER_TURN = 'afterTurn';

EmpireEvent.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';
EmpireEvent.prototype.EVENT_AFTER_CREATE = 'beforeCreate';

/**
 * Registriert einen Event Listener auf dem globalen Body Element
 *
 * @param {string} event
 * @param {function} callback
 * @return {void}
 */
EmpireEvent.prototype.listen = function(event, callback) {
	this.element.addEventListener(event, callback, false);
};

/**
 * Fuehrt alle Events (Callbacks) in einer Eventgruppe aus
 * @see: https://developer.mozilla.org/de/docs/Web/API/Event/Event
 *
 * @param {string} name
 * @return {void}
 */
EmpireEvent.prototype.fire = function(name) {
	this.element.dispatchEvent(new Event(name));
};

if(_.isUndefined(Empire.event) === true) {
	Empire.event = new EmpireEvent();
}

export default null;