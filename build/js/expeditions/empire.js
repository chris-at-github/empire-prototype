'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import ActionMixin from 'mixins/object/action';
import ExpeditionStorage from 'managers/storage/expedition';
import ResourceValue from 'resources/value';
import ResourceCollection from 'resources/collection';
import ProbabilityManager from 'managers/probability';
import Collection from 'collection/collection';
import resource from "../resources/resource";

let EmpireExpedition = function() {

	/**
	 * Definition von Eigenschaften ueberschreiben
	 *
	 * @type {string[]}
	 */
	this.properties = ['id', 'type', 'state', 'unit', 'settlement', 'resources'];

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
};

/**
 * Initialisierung der SearchAction
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
			if(
				(expedition.state === Empire.expedition.STATE_SEARCH || expedition.state === Empire.expedition.STATE_ON_HOLD) &&
				expedition.getUnit().getActionPoints() >= expedition.getUnit().getMoveActionPoints()) {
				return true;
			}

			return false;
		},

		onVisible: function() {
			if(expedition.state === Empire.expedition.STATE_SEARCH || expedition.state === Empire.expedition.STATE_ON_HOLD || expedition.state === Empire.expedition.STATE_MOVE_TO_SEARCH) {
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
			if(expedition.getUnit().getActionPoints() >= expedition.getUnit().getMoveActionPoints()) {
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
		label:     'Ausladen',
		onEnabled: function() {
			return true;
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
		state: Empire.expedition.STATE_ON_HOLD,
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
	if(this.state !== Empire.expedition.STATE_ON_HOLD && this.state !== Empire.expedition.STATE_SEARCH && this.state !== Empire.expedition.STATE_MOVE_TO_SEARCH) {
		return false;
	}

	// reichen die bestehenden AP der Einheit aus um eine Suche zu starten
	while(action.isEnabled() === true) {

		// zuerst die Bewegung, danach die Suche
		if(action.isEnabled() === true && (this.state === Empire.expedition.STATE_SEARCH || this.state === Empire.expedition.STATE_ON_HOLD)) {
			this.state = Empire.expedition.STATE_MOVE_TO_SEARCH;
			this.getUnit().subActionPoints(this.getUnit().getMoveActionPoints());

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

		if(action.isEnabled() === true && this.state === Empire.expedition.STATE_MOVE_TO_SEARCH) {
			this.state = Empire.expedition.STATE_SEARCH;
			this.getUnit().subActionPoints(this.getUnit().getSearchActionPoints());
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
			console.log(exeception);
		}
	});

	// Alles ausgeladen -> erstmal wieder in den Ruhemodus
	if(this.getResources().count() === 0) {
		this.state = Empire.expedition.STATE_ON_HOLD;
	}

	return this.store();
};

export default EmpireExpedition;