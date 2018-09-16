'use strict';

let UnitManager = function() {
};

// 'Konstanten' Definition
UnitManager.prototype.RETURN_TYPE_KEYS = 'objectManager.returnType.keys';
UnitManager.prototype.RETURN_TYPE_JSON = 'objectManager.returnType.json';
UnitManager.prototype.RETURN_TYPE_OBJECT = 'objectManager.returnType.object';

/**
 * @param {object} data
 * @param {object} options
 * @return {mixed}
 */
UnitManager.prototype.filter = function(data, options) {
	return _.filter(data, function(value) {
		let relevant = null;

		// einer Siedlung zugeordnet
		if(_.isUndefined(options.settlement) === false && relevant !== false) {
			if(options.settlement === value.parent) {
				relevant = true;
			}
		}

		if(relevant === true || _.isEmpty(options) === true) {
			return value;
		}
	});
};

/**
 * @param {object} options
 * @param {string} returnType
 * @return {mixed}
 */
UnitManager.prototype.find = function(options = {}, returnType) {
	let data = this.filter(Game.units, options);
	let units = {};

	if(returnType === this.RETURN_TYPE_JSON || _.isUndefined(returnType) === true) {
		_.forEach(data, function(data) {
			units[data.id] = data;
		});
	}

	if(returnType === this.RETURN_TYPE_KEYS) {
		units = [];

		_.forEach(data, function(data) {
			units.push(data.id);
		});
	}

	if(returnType === this.RETURN_TYPE_OBJECT) {

		_.forEach(data, function(data) {
			units[data.id] = Empire.factory.unit.create(data.qcn);
		});
	}

	return units;
};

export default UnitManager;