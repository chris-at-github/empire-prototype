'use strict';

import SettlementStorageManager from 'managers/storage/settlement';
import ObjectStorageManager from 'managers/storage/object';
import UnitStorageManager from 'managers/storage/unit';

let Turn = function() {
	let turn = this;

	this.beforeTurnObjects = {
		settlements: [],
		object: {
			buildings: []
		},
		units: []
	};

	this.afterTurnObjects = {
		settlements: [],
		object: {
			buildings: []
		},
		units:  []
	};

	this.objectTypes = {
		buildings: {
			factoryName: 'building',
			storage: null
		}
	};

	Empire.event.listen(Empire.event.EVENT_CREATE_APPLICATION, function(event) {

		// Speicherpfad fuer Gebauede setzen
		turn.objectTypes.buildings.storage = Game.buildings;

		// Before- und After-Turn Events auslesen
		turn.getEventObjects();
	});
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

	// this.objectTypes.buildings.storage = Game.buildings;

	// Uberpruefe alle After Turn (= nachdem der User alle manuellen Schritte durchgefuehrt hat) Objekte
	// Siedlungen
	this.fireSettlementEvent(this.EVENT_AFTER_TURN, this.afterTurnObjects.settlements);

	// Objekte
	this.fireObjectEvent(this.EVENT_AFTER_TURN, this.afterTurnObjects.object);

	// Einheiten
	this.fireUnitEvent(this.EVENT_AFTER_TURN, this.afterTurnObjects.units);

	// Rundeneinheit anheben
	Game.turn = Game.turn + 1;

	// Uberpruefe alle Before Turn (= bevor der Benutzer Aktionen durchfuehrt) Objekte
	// Siedlungen
	this.fireSettlementEvent(this.EVENT_BEFORE_TURN, this.beforeTurnObjects.settlements);

	// Objekte
	this.fireObjectEvent(this.EVENT_BEFORE_TURN, this.beforeTurnObjects.object);

	// Einheiten
	this.fireUnitEvent(this.EVENT_AFTER_TURN, this.beforeTurnObjects.units);
};

/**
 * Startet ein Event auf allen relevanten Siedlungsobjekten
 *
 * @param {string} event
 * @param {array} objects
 */
Turn.prototype.fireSettlementEvent = function(event, objects) {
	let storage = new SettlementStorageManager();

	_.forEach(Game.settlements, function(properties, id) {
		if(_.indexOf(objects, properties.qcn) !== - 1) {
			let object = Empire.factory.settlement.create(properties.qcn);

			object.fill(properties);
			object.fire(event);

			storage.store(object);
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
	let storage = new ObjectStorageManager();

	_.forEach(turn.objectTypes, function(objectProperties, type) {
		storage.setStorage(objectProperties.storage);

		_.forEach(Game[type], function(properties, id) {

			if(_.indexOf(objects[type], properties.qcn) !== - 1) {
				let object = Empire.factory.object.create(properties.qcn);

				object.fill(properties);
				object.fire(event);

				storage.store(object);
			}
		});
	});
};

/**
 * Startet ein Event auf allen relevanten Einheiten-Instanzen
 *
 * @param {string} event
 * @param {array} units
 */
Turn.prototype.fireUnitEvent = function(event, units) {
	let storage = new UnitStorageManager();

	_.forEach(Game.units, function(properties, id) {
		if(_.indexOf(units, properties.qcn) !== - 1) {
			let unit = Empire.factory.unit.create(properties.qcn);

			unit.fill(properties);
			unit.fire(event);

			storage.store(unit);
		}
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

	// Einheiten
	_.forEach(Empire.unit, function(Unit) {
		let unit = new Unit();

		if(unit.hasListener(turn.EVENT_BEFORE_TURN) === true) {
			turn.beforeTurnObjects.units.push(unit.qcn);
		}

		if(unit.hasListener(turn.EVENT_AFTER_TURN) === true) {
			turn.afterTurnObjects.units.push(unit.qcn);
		}
	});
};

export default Turn;