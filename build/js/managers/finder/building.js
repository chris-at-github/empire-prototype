'use strict';

let BuildingFinder = function() {
};

// 'Konstanten' Definition
// BuildingFinder.prototype.WORLD = 'world';

/**
 * @param {object} options
 * @param {string} returnType
 * @return {mixed}
 */
BuildingFinder.prototype.find = function(options, returnType) {
	return Game.buildings;
};

export default BuildingFinder;