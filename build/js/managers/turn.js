'use strict';

let Turn = function() {
	this.beforeTurnObjects = {
		settlement: []
	};
	this.afterTurnObjects = {
		settlement: []
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
	let turn = this;

	this.getEventObjects();

	// @todo: Uberpruefe alle Before Turn Objekte

	Game.turn = Game.turn + 1;

	// Uberpruefe alle Before Turn Objekte
	// Siedlungen
	_.forEach(Game.settlements, function(properties, id) {
		if(_.indexOf(turn.afterTurnObjects.settlement, properties.qcn) !== -1) {
			let object = Empire.factory.settlement.create(properties.qcn);
					object.fill(properties);

			object.fire(turn.EVENT_AFTER_TURN);
		}
	});
};

/**
 * Geht alle Objekte (Gebaeude, Objekte, Einheiten) durch und ueberprueft ob es einen EventListener fuer After- bzw. Before-
 * Turn gibt
 */
Turn.prototype.getEventObjects = function() {
	let turn = this;

	_.forEach(Empire.object.settlement, function(Settlement) {
		let object = new Settlement();

		if(object.hasListener(turn.EVENT_BEFORE_TURN) === true) {
			turn.beforeTurnObjects.settlement.push(object.qcn);
		}

		if(object.hasListener(turn.EVENT_AFTER_TURN) === true) {
			turn.afterTurnObjects.settlement.push(object.qcn);
		}
	});
};

export default Turn;