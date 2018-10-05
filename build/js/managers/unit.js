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
 * @return {*}
 */
UnitManager.prototype.filter = function(data, options) {
	return _.filter(data, function(value) {
		let hit = null;

		// QCN
		// Uebergabe als String oder als Array -> wird immer in ein Array umgewandelt
		if(_.isUndefined(options.qcn) === false && hit !== false) {
			if(typeof(options.qcn) === 'string') {
				options.qcn = [options.qcn];
			}

			hit = _.indexOf(options.qcn, value.qcn) !== - 1;
		}

		// einer Siedlung zugeordnet
		if(_.isUndefined(options.settlement) === false && hit !== false) {
			hit = options.settlement === value.parent;
		}

		if(hit === true || _.isEmpty(options) === true) {
			return value;
		}
	});
};

/**
 * @param {object} options
 * @param {string} returnType
 * @return {*}
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