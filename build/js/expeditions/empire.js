'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import ActionMixin from 'mixins/object/action';
import ExpeditionStorage from 'managers/storage/expedition';
import ResourceValue from 'resources/value';
import ResourceCollection from 'resources/collection';
import ProbabilityManager from 'managers/probability';
import Collection from 'collection/collection';

let EmpireExpedition = function() {

	/**
	 * Definition von Eigenschaften ueberschreiben
	 *
	 * @type {string[]}
	 */
	this.properties = ['id', 'type', 'state', 'unit', 'settlement', 'resources', 'automatic'];

	/**
	 * Zuruecksetzen der Event-Listener -> ueber das Mixin ist es sonst eine globale Variable
	 *
	 * @type {object}
	 */
	this.eventListener = {};

	/**
	 * Typ der Expedition: Suche oder direktes Ziel
	 *
	 * @type {string}
	 */
	this.type = null;

	/**
	 * Status der aktuellen Expedition
	 *
	 * @type {string}
	 */
	this.state = null;

	/**
	 * Eingesetzte Einheit
	 *
	 * @type {object} CollectorUnit
	 */
	this.unit = null;

	/**
	 * Basis der Expedition
	 *
	 * @type {object} ApplicationSettlement
	 */
	this.settlement = null;

	/**
	 * gefundene Resourcen
	 *
	 * @type {object} ResourceCollection
	 */
	this.resources = new ResourceCollection();

	/**
	 * Aktionen die in der Expedition moeglich sind
	 *
	 * @type {object} Collection
	 */
	this.actions = new Collection();

	/**
	 * Automatischer Neustart nach erfolgreicher Suche?
	 *
	 * @type {boolean}
	 */
	this.automatic = true;

	// Initialisierung
	this.initialize();
};

// Einbindung Mixins
Object.assign(EmpireExpedition.prototype, SerializableMixin);
Object.assign(EmpireExpedition.prototype, EventMixin);
Object.assign(EmpireExpedition.prototype, ActionMixin);

/**
 * Initialisierung
 *
 * @return {void}
 */
EmpireExpedition.prototype.initialize = function() {
	this.resources.setMaxValue(1);
	this.resources.setMaxResources(1);

	this.initializeSearchAction();
	this.initializeReturnToSettlementAction();
	this.initializeUnloadAction();
	this.initializeRestartAction();
	this.initializeReUnloadAction();
	this.initializeRemoveAction();

	this.listen(Empire.manager.turn.EVENT_BEFORE_TURN, this.executeAfterTurn);
};

/**
 * Initialisierung der SearchAction
 * @todo: ohne STATE_ON_HOLD
 *
 * @return {void}
 */
EmpireExpedition.prototype.initializeSearchAction = function() {
	let expedition = this;

	this.addAction(new Empire.action({
		name:      Empire.action.EXPEDITION_SEARCH,
		label:     'Suchen',
		onEnabled: function() {

			// Falls bereits etwas gefunden wurde, setze die Suche nicht fort
			if(expedition.getResources().count() !== 0) {
				return false;
			}

			// Hat sich der Sammler zuvor auf ein neues Feld bewegt und reichen die AP fuer einen erneuten Suchlauf
			if(expedition.state === Empire.expedition.STATE_MOVE_TO_SEARCH && expedition.getUnit().getActionPoints() >= expedition.getUnit().getSearchActionPoints()) {
				return true;
			}

			// Befindet sich der Sammler im Wartemodus oder hat bereits das Feld abgesucht und reichen die AP fuer eine Bewegung zum naechsten Feld
			if(expedition.state === Empire.expedition.STATE_SEARCH && expedition.getUnit().getActionPoints() >= expedition.getUnit().getMoveActionPoints()) {
				return true;
			}

			return false;
		},

		onVisible: function() {
			if(expedition.state === Empire.expedition.STATE_SEARCH || expedition.state === Empire.expedition.STATE_MOVE_TO_SEARCH) {
				return true;
			}

			return false;
		},

		onExecute: _.bind(this.search, this)
	}));
};

/**
 * Initialisierung der ReturnToSettlementAction
 *
 * @return {void}
 */
EmpireExpedition.prototype.initializeReturnToSettlementAction = function() {
	let expedition = this;

	this.addAction(new Empire.action({
		name:      Empire.action.EXPEDITION_RETURN_TO_SETTLEMENT,
		label:     'Bewegen',
		onEnabled: function() {

			// Reichen die AP fuer eine Bewegung zur Siedlung
			if(expedition.state === Empire.expedition.STATE_RETURN_TO_SETTLEMENT && expedition.getUnit().getActionPoints() >= expedition.getUnit().getMoveActionPoints()) {
				return true;
			}

			return false;
		},

		onVisible: function() {
			if(expedition.state === Empire.expedition.STATE_RETURN_TO_SETTLEMENT) {
				return true;
			}

			return false;
		},

		onExecute: _.bind(this.returnToSettlement, this)
	}));
};

/**
 * Initialisierung der UnloadAction
 *
 * @return {void}
 */
EmpireExpedition.prototype.initializeUnloadAction = function() {
	let expedition = this;

	this.addAction(new Empire.action({
		name:      Empire.action.EXPEDITION_UNLOAD,
		label:     'Entladen',

		onEnabled: function() {

			// @todo: hier muss man sich noch etwas ueberlegen -> sonst Endlosschleife in AfterTurn
			if(expedition.state === Empire.expedition.STATE_UNLOAD) {
				return true;
			}

			return false;
		},

		onVisible: function() {
			if(expedition.state === Empire.expedition.STATE_UNLOAD) {
				return true;
			}

			return false;
		},

		onExecute: _.bind(this.unload, this)
	}));
};

/**
 * Initialisierung der RestartAction
 *
 * @return {void}
 */
EmpireExpedition.prototype.initializeRestartAction = function() {
	let expedition = this;

	this.addAction(new Empire.action({
		name:      Empire.action.EXPEDITION_RESTART,
		label:     'Erneut suchen',

		onVisible: function() {
			if(expedition.state === Empire.expedition.STATE_ON_HOLD || expedition.state === Empire.expedition.STATE_UNLOAD || expedition.state === Empire.expedition.STATE_RETURN_TO_SETTLEMENT) {
				return true;
			}

			return false;
		},

		onExecute: _.bind(this.restart, this)
	}));
};

/**
 * Initialisierung der RemoveAction
 *
 * @return {void}
 */
EmpireExpedition.prototype.initializeRemoveAction = function() {
	this.addAction(new Empire.action({
		name:      Empire.action.EXPEDITION_REMOVE,
		label:     'Entfernen',
		onExecute: _.bind(this.remove, this)
	}));
};

/**
 * Initialisierung der ReUnloadAction
 *
 * @return {void}
 */
EmpireExpedition.prototype.initializeReUnloadAction = function() {
	let expedition = this;

	this.addAction(new Empire.action({
		name:  Empire.action.EXPEDITION_REUNLOAD,
		label: 'Entladen',

		onVisible: function() {
			if(expedition.state === Empire.expedition.STATE_UNLOAD_ON_HOLD) {
				return true;
			}

			return false;
		},

		onExecute: _.bind(this.reunload, this)
	}));
};

/**
 * Wird VOR dem Einfuegen der Expedition ausgefuehrt
 *
 * @return {void}
 */
EmpireExpedition.prototype.beforeCreate = function() {
	this.fire(Empire.event.EVENT_BEFORE_CREATE);
};

/**
 * Wird NACH dem Einfuegen der Expedition ausgefuehrt
 *
 * @return {void}
 */
EmpireExpedition.prototype.afterCreate = function() {
	this.fire(Empire.event.EVENT_AFTER_CREATE);
};

/**
 * Speichert die aktuelle Expedition
 *
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.store = function() {
	let storage = new ExpeditionStorage();
			storage.store(this);

	return this;
};

/**
 * Setzen der Id als Methode -> damit ein feuern Nach-Id-Setzen Events moeglich ist
 *
 * @param {int} id
 */
EmpireExpedition.prototype.setId = function(id) {
	this.id = id;
};

/**
 * Liefert ein Unit Objekt zurueck
 *
 * @return {object} CollectorUnit
 */
EmpireExpedition.prototype.getUnit = function() {
	return this.unit;
};

/**
 * Speichert das Unit Objekt
 *
 * @param {object} unit CollectorUnit
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.setUnit = function(unit) {
	this.unit = unit;

	return this;
};

/**
 * Wird aufgerufen bevor das Objekt mit Daten befuellt wird
 *
 * @param {string} id
 * @return {void}
 */
EmpireExpedition.prototype.beforeUnitFill = function(id) {
	if(_.isUndefined(Game.units[id]) === false) {
		let data = Game.units[id];

		this.unit = Empire.factory.unit.create(data.qcn);
		this.unit.fill(data);
	}
};

/**
 * Wird aufgerufen bevor das (Einheiten-) Objekt zu einem JSON Objekt umgewandelt wird
 *
 * @return {string|null} id
 */
EmpireExpedition.prototype.beforeUnitToJson = function() {
	if(_.isUndefined(this.unit.id) === false) {
		return this.unit.id;
	}

	return null;
};

/**
 * Liefert ein Settlement Objekt zurueck
 *
 * @return {object} ApplicationSettlement
 */
EmpireExpedition.prototype.getSettlement = function() {
	return this.settlement;
};

/**
 * Setzt das Settlement Objekt
 *
 * @param {object} ApplicationSettlement
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.setSettlement = function(settlement) {
	this.settlement = settlement;
	return this;
};

/**
 * Wird aufgerufen bevor das Objekt mit Daten befuellt wird
 *
 * @param {string} id
 * @return {void}
 */
EmpireExpedition.prototype.beforeSettlementFill = function(id) {
	if(_.isUndefined(Game.settlements[id]) === false) {
		let data = Game.settlements[id];

		this.settlement = Empire.factory.settlement.create(data.qcn);
		this.settlement.fill(data);
	}
};

/**
 * Wird aufgerufen bevor das (Siedlungs-) Objekt zu einem JSON Objekt umgewandelt wird
 *
 * @return {string|null} id
 */
EmpireExpedition.prototype.beforeSettlementToJson = function() {
	if(_.isUndefined(this.settlement.id) === false) {
		return this.settlement.id;
	}

	return null;
};

/**
 * Liefert die Resource Collection zurueck
 *
 * @return {object} ResourceCollection
 */
EmpireExpedition.prototype.getResources = function() {
	return this.resources;
};

/**
 * Liefert die Wahrscheinlichkeit fuer das Finden einer Resource
 *
 * @return {int}
 */
EmpireExpedition.prototype.getProbability = function() {
	return 50;
};

/**
 * Erstellt eine neue Expedition
 *
 * @param {object} options
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.create = function(options = {}) {

	// initialen Status auf Empire.expedition.TYPE_SEARCH stellen (falls nicht per Option uebergeben)
	if(_.isUndefined(options.type) === true) {
		options.type = Empire.expedition.TYPE_SEARCH;
	}

	if(_.isUndefined(options.settlement) === false) {
		let workers = options.settlement.getAvailableWorker();

		if(_.size(workers) !== 0) {

			// ersten verfuegbaren Arbeiter auswaehlen und einen Sammler umwandeln
			let data = Object.values(workers)[0];
			let worker = Empire.factory.unit.create(data.qcn);
					worker.fill(data);

			options.unit = worker.convert('unit.collector');		
		}
	}

	let expedition = Empire.factory.expedition.create();

	expedition.fill({
		state: Empire.expedition.STATE_SEARCH,
		type: options.type
	});

	expedition.setSettlement(options.settlement);
	expedition.setUnit(options.unit);

	expedition.store();

	return this;
};

/**
 * Fuehrt eine neue Suchaktion aus
 *
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.search = function() {
	let action = this.getAction(Empire.action.EXPEDITION_SEARCH);

	// befindet sich die Expedition im Suchmodus -> ansonsten return false
	if(this.state !== Empire.expedition.STATE_SEARCH && this.state !== Empire.expedition.STATE_MOVE_TO_SEARCH) {
		return false;
	}

	// reichen die bestehenden AP der Einheit aus um eine Suche zu starten
	while(action.isEnabled() === true) {

		// zuerst die Bewegung, danach die Suche
		if(action.isEnabled() === true && this.state === Empire.expedition.STATE_SEARCH) {
			this.state = Empire.expedition.STATE_MOVE_TO_SEARCH;
			this.getUnit().subActionPoints(this.getUnit().getMoveActionPoints());
		}

		if(action.isEnabled() === true && this.state === Empire.expedition.STATE_MOVE_TO_SEARCH) {
			this.state = Empire.expedition.STATE_SEARCH;
			this.getUnit().subActionPoints(this.getUnit().getSearchActionPoints());

			// Fuer Expeditionen verfuegbare Resourcen als Option hinlegen
			let probability = new ProbabilityManager();

			_.forEach(Empire.configuration.expedition.resources, function(resource) {
				probability.add(function() {
					return resource
				}, 1);
			});

			// Falls eine Resource gefunden wurde, wird diese im Datensatz hinterlegt
			let resource = probability.execute(this.getProbability());
			if(resource !== null) {
				this.getResources().addResourceValue(new ResourceValue(resource, 1));
			}
		}
	}

	// aktuellen Status der Einheit zwischenspeichern
	this.getUnit().store();

	// Suche erfolgreich
	if(this.getResources().count() !== 0) {
		this.state = Empire.expedition.STATE_RETURN_TO_SETTLEMENT;
	}

	this.store();

	return this;
};

/**
 * Bewegt die Einheit zurueck zur Siedlung
 * @todo Ausarbeitung mit Map-Update (v0.0.9)
 *
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.returnToSettlement = function() {
	this.getUnit().subActionPoints(this.getUnit().getMoveActionPoints());
	this.getUnit().store();

	// @todo: in Zukunft erst nach Ankunft
	this.state = Empire.expedition.STATE_UNLOAD;
	this.store();
};

/**
 * Laedt die Resourcen in das Lager der Siedlung
 *
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.unload = function() {
	let expedition = this;

	_.forEach(this.resources.find(), function(resource) {

		try {
			// Resource von der Expedition ins Lager der Siedlung uebertragen
			expedition.getSettlement().getResources().addResourceValue(resource);
			expedition.getResources().removeResourceValue(resource.qcn);

			expedition.getSettlement().store();

		} catch(exeception) {

			// @todo: Ausgabe Notification
			expedition.state = Empire.expedition.STATE_UNLOAD_ON_HOLD;
			console.log(exeception);
		}
	});

	// Alles ausgeladen -> erstmal wieder in den Ruhemodus
	if(this.getResources().count() === 0) {

		// Wenn auf Automatik, starte die naechste Suche
		if(this.automatic === true) {
			this.state = Empire.expedition.STATE_SEARCH;
			return this.search();

		} else {
			this.state = Empire.expedition.STATE_ON_HOLD;
		}
	}

	return this.store();
};

/**
 * Erneuter Versuch zum Entladen
 *
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.reunload = function() {
	this.state = Empire.expedition.STATE_UNLOAD;

	return this.unload();
};

/**
 * Entfernt die Resourcen und startet die Suche erneut
 *
 * @return {object} EmpireExpedition
 */
EmpireExpedition.prototype.restart = function() {

	// Resourcen entfernen und Status neu setzen
	this.getResources().empty();
	this.state = Empire.expedition.STATE_SEARCH;

	// Suche neu starten
	return this.search();
};

/**
 * Entfernt eine neue Expedition
 * @todo der Sammler muss immer zuerst zurueck zur Siedlung -> erst nach dem Map-Update (v0.0.9)
 *
 * @return {void}
 */
EmpireExpedition.prototype.remove = function() {

	// Arbeiter zurueck in einen Arbeiter umwandeln
	this.getUnit().convert('unit.worker');

	// Diese Expediton aufloesen
	Empire.manager.expedition.remove(this.id);
};

/**
 * Fuehrt die Expeditonen automatisch nach Beendigung der Runde aus
 *
 * @return {boolean}
 */
EmpireExpedition.prototype.executeAfterTurn = function() {

	// Erneute Ausfuehrung nur wenn mindestens eine Aktion erfolgreich war -> nur dann macht ein moeglicher Durchlauf nochmal Sinn
	// -> sonst hat sich ja nichts geaendert
	let recursive = false;
	let expedition = this;

	// Sucheablauf durchfuehren bis alle Aktion auf isEnabled == false laufen
	_.forEach([Empire.action.EXPEDITION_SEARCH, Empire.action.EXPEDITION_RETURN_TO_SETTLEMENT, Empire.action.EXPEDITION_UNLOAD], function(action) {
		if(expedition.getAction(action).isEnabled() === true) {
			expedition.getAction(action).execute();
			recursive = true;
		}
	});

	if(recursive === true) {
		_.forEach([Empire.action.EXPEDITION_SEARCH, Empire.action.EXPEDITION_RETURN_TO_SETTLEMENT, Empire.action.EXPEDITION_UNLOAD], function(action) {
			if(expedition.getAction(action).isEnabled() === true) {
				console.log(action, expedition.state);
			}
		});

		this.executeAfterTurn();
	}
};

export default EmpireExpedition;