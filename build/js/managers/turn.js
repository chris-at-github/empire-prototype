'use strict';

let Turn = function() {

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
	Game.turn = Game.turn + 1;
};

/**
 * Geht alle Objekte (Gebaeude, Objekte, Einheiten) durch und ueberprueft ob es einen EventListener fuer After- bzw. Before-
 * Turn gibt
 */
Turn.prototype.getEventObjects = function() {
	let turn = this;

	_.forEach(Empire.object.settlement, function(Settlement) {
		let object = new Settlement();

		console.log(object.hasListener(turn.EVENT_BEFORE_TURN));
	});
};

export default Turn;