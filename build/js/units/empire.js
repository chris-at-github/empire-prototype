'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import UnitStorage from 'managers/storage/unit';

let EmpireUnit = function() {

	/**
	 * Aktionspunkte der Einheit
	 *
	 * @type {number}
	 */
	this.actionPoints = 0;

	/**
	 * Initiale Aktionspunkte, die beim Erstellen und am Rundenanfang gesetzt werden
	 * kann in den Kindobjekten abweichend definiert werden
	 *
	 * @type {number}
	 */
	this.initialActionPoints = 100;

	/**
	 * Definition von Eigenschaften ueberschreiben
	 * @type {string[]}
	 */
	this.properties = ['id', 'parent', 'actionPoints'];

	// Zuruecksetzen der Event-Listener -> ueber das Mixin ist es sonst eine globale Variable
	this.eventListener = {};

	// Initialisierung
	this._initialize();
};

// Konstanten Definition
EmpireUnit.prototype.EVENT_BEFORE_CREATE = 'beforeCreate';
EmpireUnit.prototype.EVENT_AFTER_CREATE = 'afterCreate';

// Einbindung Mixins
Object.assign(EmpireUnit.prototype, SerializableMixin);
Object.assign(EmpireUnit.prototype, EventMixin);

/**
 * Initialisierung
 *
 * @return {void}
 */
EmpireUnit.prototype._initialize = function() {

	// AP vor Rundenanfang | bei Erstellung wieder auffuellen
	this.listen(this.EVENT_AFTER_CREATE, this.fillUpActionPoints);
	this.listen(Empire.manager.turn.EVENT_BEFORE_TURN, this.fillUpActionPoints);
};

/**
 * Speichert das aktuelle Objekt
 *
 * @return {object} building
 */
EmpireUnit.prototype.store = function() {
	let storage = new UnitStorage();
			storage.store(this);
},


/**
 * Wird VOR dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {boolean}
 */
EmpireUnit.prototype.beforeCreate = function() {
	this.fire(this.EVENT_BEFORE_CREATE);
	return true;
};

/**
 * Wird NACH dem Einfuegen des Objekts durchgefuehrt
 *
 * @return {void}
 */
EmpireUnit.prototype.afterCreate = function() {
	this.fire(this.EVENT_AFTER_CREATE);
};

/**
 * Setzen der Id als Methode -> damit ein feuern Nach-Id-Setzen Events moeglich ist
 *
 * @param {int} id
 */
EmpireUnit.prototype.setId = function(id) {
	this.id = id;
};

/**
 * @param {string} qcn
 * @return {object} EmpireUnit
 */
EmpireUnit.prototype.setQcn = function(qcn) {
	this.qcn = qcn;
};

/**
 * Liefert die verfuegbaren AP der Einheit
 *
 * @return {int}
 */
EmpireUnit.prototype.getActionPoints = function() {
	return this.actionPoints;
};

/**
 * Setzt die verfuegbaren AP der Einheit
 *
 * @param {int} actionPoints
 * @return {object} unit
 */
EmpireUnit.prototype.setActionPoints = function(actionPoints) {
	this.actionPoints = actionPoints;
	return this;
};

/**
 * Zieht AP von dem bestehenden APs ab
 * @todo throw Exception wenn die AP unter 0 fallen
 *
 * @param {int} actionPoints
 * @return {object} unit
 */
EmpireUnit.prototype.subActionPoints = function(actionPoints) {
	this.actionPoints -= actionPoints;
	return this;
};

/**
 * Fuellt die AP vor der Runde wieder auf
 *
 * @return {void}
 */
EmpireUnit.prototype.fillUpActionPoints = function() {
	this.actionPoints = this.initialActionPoints;
};

/**
 * Wandelt eine Einheit in einen anderen Typ um
 *
 * @param {string} qcn
 * @return {object} Instanz der neuen Einheit
 */
EmpireUnit.prototype.convert = function(qcn) {

	// QCN aendern und direkt speichern -> damit es als neue Instanz geladen werden kann
	this.setQcn(qcn);
	this.store();

	// Neue Instanz mit der neuen QCN erzeugen
	// @todo Entfernung von unnoetigen Eigenschaften (this.properties) noetig?
	let converted = Empire.factory.unit.create(qcn);
			converted.fill(this.toJson());

	return converted;
};

/**
 * Liefert die AP zurueck, die fuer die naechste Bewegung noetig ist
 *
 * @return {int}
 */
EmpireUnit.prototype.getMoveActionPoints = function() {

	// @todo Implementierung mit dem Map-Update (0.0.9)

	return 25;
};

export default EmpireUnit;