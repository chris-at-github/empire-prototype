'use strict';

let Settlement = function() {
};

/**
 * @see: https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
 */
Settlement.prototype.resolveNamespace = function(namespace, context) {
	let sections = namespace.split('.');
	let name = sections.pop();

	for(let i = 0; i < sections.length; i ++) {
		context = context[sections[i]];
	}

	return new context[name]();
};

Settlement.prototype.create = function(namespace) {
	return this.resolveNamespace(namespace, Empire.object);
};

export default Settlement;