'use strict';

let ExpeditionManager = function() {
};

// 'Konstanten' Definition
ExpeditionManager.prototype.RETURN_TYPE_KEYS = 'objectManager.returnType.keys';
ExpeditionManager.prototype.RETURN_TYPE_JSON = 'objectManager.returnType.json';
ExpeditionManager.prototype.RETURN_TYPE_OBJECT = 'objectManager.returnType.object';

/**
 * @param {object} data
 * @param {object} options
 * @return {*}
 */
ExpeditionManager.prototype.filter = function(data, options) {
	return _.filter(data, function(value) {
		let hit = null;

		// einer Siedlung zugeordnet
		if(_.isUndefined(options.settlement) === false && hit !== false) {
			hit = options.settlement === value.settlement;
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
ExpeditionManager.prototype.find = function(options = {}, returnType) {
	let data = this.filter(Game.expeditions, options);
	let expeditions = {};

	if(returnType === this.RETURN_TYPE_JSON || _.isUndefined(returnType) === true) {
		_.forEach(data, function(data) {
			expeditions[data.id] = data;
		});
	}

	if(returnType === this.RETURN_TYPE_KEYS) {
		expeditions = [];

		_.forEach(data, function(data) {
			expeditions.push(data.id);
		});
	}

	if(returnType === this.RETURN_TYPE_OBJECT) {
		_.forEach(data, function(data) {
			expeditions[data.id] = new Empire.factory.expedition.create();
			expeditions[data.id].fill(data);
		});
	}

	return expeditions;
};

export default ExpeditionManager;