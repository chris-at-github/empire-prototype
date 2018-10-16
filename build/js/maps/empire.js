'use strict';

import SerializableMixin from 'mixins/object/serializable';
import EventMixin from 'mixins/object/event';
import ActionMixin from 'mixins/object/action';
import Collection from 'collection/collection';

let EmpireMap = function() {

	/**
	 * Definition von Eigenschaften ueberschreiben
	 *
	 * @type {string[]}
	 */
	this.properties = ['id', 'tiles'];

	/**
	 * Tiles der Map
	 *
	 * @type {object} Collection
	 */
	this.tiles = new Collection();

	/**
	 * Zuruecksetzen der Event-Listener -> ueber das Mixin ist es sonst eine globale Variable
	 *
	 * @type {object}
	 */
	this.eventListener = {};

	// Initialisierung
	this._initialize();
};

// Einbindung Mixins
Object.assign(EmpireMap.prototype, SerializableMixin);
Object.assign(EmpireMap.prototype, EventMixin);
Object.assign(EmpireMap.prototype, ActionMixin);

/**
 * Initialisierung
 *
 * @return {void}
 */
EmpireMap.prototype._initialize = function() {
};

/**
 * Liefert alle Tiles zurueck
 *
 * @return {object} Collection
 */
EmpireMap.prototype.getTiles = function() {
	return this.tiles;
};

/**
 * Speichert die Tiles Collection
 *
 * @param {object} tiles Collection
 * @return {object} EmpireMap
 */
EmpireMap.prototype.setTiles = function(tiles) {
	this.tiles = tiles;

	return this;
};

/**
 * Wird aufgerufen bevor das Objekt mit Daten befuellt wird
 *
 * @param {string} id
 * @return {void}
 */
EmpireMap.prototype.beforeTilesFill = function(id) {
	// if(_.isUndefined(Game.units[id]) === false) {
	// 	let data = Game.units[id];
	//
	// 	this.unit = Empire.factory.unit.create(data.qcn);
	// 	this.unit.fill(data);
	// }
};

/**
 * Wird aufgerufen bevor das (Tiles-) Objekt zu einem JSON Objekt umgewandelt wird
 *
 * @return {string|null} id
 */
EmpireMap.prototype.beforeTilesToJson = function() {
	// if(_.isUndefined(this.tiles.id) === false) {
	// 	return this.unit.id;
	// }
	//
	// return null;
};

export default EmpireMap;