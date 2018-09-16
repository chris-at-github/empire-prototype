'use strict';

let ObjectManager = function() {
};

// 'Konstanten' Definition
ObjectManager.prototype.TYPE_BUILDING = 'objectManager.type.building';

ObjectManager.prototype.RETURN_TYPE_KEYS = 'objectManager.returnType.keys';
ObjectManager.prototype.RETURN_TYPE_JSON = 'objectManager.returnType.json';
ObjectManager.prototype.RETURN_TYPE_OBJECT = 'objectManager.returnType.object';

/**
 * @param {string} type
 * @return {object}
 */
ObjectManager.prototype.getObjectsData = function(type) {
	let objectData = {};

	if(type === null) {
		objectData = _.merge(objectData, Game.buildings);
	}

	if(type === this.TYPE_BUILDING) {
		objectData = Game.buildings;
	}

	return objectData;
};

/**
 * @param {object} data
 * @param {object} options
 * @return {mixed}
 */
ObjectManager.prototype.filter = function(data, options) {
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
 * @param {string} type
 * @param {string} returnType
 * @return {mixed}
 */
ObjectManager.prototype.find = function(options = {}, type = null, returnType) {
	let data = this.filter(this.getObjectsData(type), options);
	let objects = {};

	if(returnType === this.RETURN_TYPE_JSON || _.isUndefined(returnType) === true) {
		_.forEach(data, function(data) {
			objects[data.id] = data;
		});
	}

	if(returnType === this.RETURN_TYPE_KEYS) {
		objects = [];
		_.forEach(data, function(data) {
			objects.push(data.id);
		});
	}

	if(returnType === this.RETURN_TYPE_OBJECT) {
		_.forEach(data, function(data) {
			objects[data.id] = Empire.factory.object.create(data.qcn);
		});
	}

	return objects;
};

export default ObjectManager;