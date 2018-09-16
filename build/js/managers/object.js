'use strict';

let ObjectManager = function() {
};

// 'Konstanten' Definition
ObjectManager.prototype.RETURN_TYPE_KEYS = 'objectManager.returnType.keys';
ObjectManager.prototype.RETURN_TYPE_JSON = 'objectManager.returnType.json';
ObjectManager.prototype.RETURN_TYPE_OBJECT = 'objectManager.returnType.object';

/**
 * @param {object} options
 * @param {string} returnType
 * @return {mixed}
 */
ObjectManager.prototype.find = function(options, returnType) {
	return Game.buildings;
};

export default ObjectManager;