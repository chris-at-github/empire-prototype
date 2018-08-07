'use strict';

let ResourceCollectionException = function(code) {
	this.code = code;
};

ResourceCollectionException.prototype.MAX_VALUE_ACHIEVED = 100;

export default ResourceCollectionException;