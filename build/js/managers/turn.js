'use strict';

let Turn = function() {
	this.beforeTurnObjects = {
		settlements: [],
		object: {
			buildings: []
		}
	};

	this.afterTurnObjects = {
		settlements: [],
		object: {
			buildings: []
		}
	};

	this.objectTypes = {
		buildings: {
			factoryName: 'building'
		}
	};
};

// Konstanten Definition
Turn.prototype.EVENT_BEFORE_TURN = 'beforeTurn';
Turn.prototype.EVENT_AFTER_TURN = 'afterTurn';

/**
 * Fuehrt die naechste Runde aus
 *
 * @return {void}
 */
Turn.prototype.next = function() {

	this.getEventObjects();

	// Uberpruefe alle After Turn (= nachdem der User alle manuellen Schritte durchgefuehrt hat) Objekte
	// Siedlungen
	this.fireSettlementEvent(this.EVENT_AFTER_TURN, this.afterTurnObjects.settlements);

	// Objekte
	this.fireObjectEvent(this.EVENT_AFTER_TURN, this.afterTurnObjects.object);

	// Rundeneinheit anheben
	Game.turn = Game.turn + 1;

	// Uberpruefe alle Before Turn (= bevor der Benutzer Aktionen durchfuehrt) Objekte
	// Siedlungen
	this.fireSettlementEvent(this.EVENT_BEFORE_TURN, this.beforeTurnObjects.settlements);

	// Objekte
	this.fireObjectEvent(this.EVENT_BEFORE_TURN, this.beforeTurnObjects.object);
};

/**
 * Startet ein Event auf allen relevanten Siedlungsobjekten
 *
 * @param {string} event
 * @param {array} objects
 */
Turn.prototype.fireSettlementEvent = function(event, objects) {
	_.forEach(Game.settlements, function(properties, id) {
		if(_.indexOf(objects, properties.qcn) !== - 1) {
			let object = Empire.factory.settlement.create(properties.qcn);

			object.fill(properties);
			object.fire(event);
		}
	});
};

/**
 * Startet ein Event auf allen relevanten Objekten
 *
 * @param {string} event
 * @param {array} objects
 */
Turn.prototype.fireObjectEvent = function(event, objects) {
	let turn = this;

	_.forEach(turn.objectTypes, function(objectProperties, type) {
		_.forEach(Game[type], function(properties, id) {

			if(_.indexOf(objects[type], properties.qcn) !== - 1) {
				let object = Empire.factory.object.create(properties.qcn);

				object.fill(properties);
				object.fire(event);
			}
		});
	});
};

/**
 * Geht alle Objekte (Gebaeude, Objekte, Einheiten) durch und ueberprueft ob es einen EventListener fuer After- bzw. Before-
 * Turn gibt
 */
Turn.prototype.getEventObjects = function() {
	let turn = this;

	// Siedlungen
	_.forEach(Empire.object.settlement, function(Settlement) {
		let object = new Settlement();

		if(object.hasListener(turn.EVENT_BEFORE_TURN) === true) {
			turn.beforeTurnObjects.settlements.push(object.qcn);
		}

		if(object.hasListener(turn.EVENT_AFTER_TURN) === true) {
			turn.afterTurnObjects.settlements.push(object.qcn);
		}
	});

	// Objekte (z.B. Gebaeude, ...)
	_.forEach(turn.objectTypes, function(properties, type) {

		_.forEach(Empire.object[properties.factoryName], function(name) {
			let object = new name();

			if(object.hasListener(turn.EVENT_BEFORE_TURN) === true) {
				turn.beforeTurnObjects.object[type].push(object.qcn);
			}

			if(object.hasListener(turn.EVENT_AFTER_TURN) === true) {
				turn.afterTurnObjects.object[type].push(object.qcn);
			}
		});
	});
};

export default Turn;