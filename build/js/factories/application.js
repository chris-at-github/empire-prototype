'use strict';

let Application = function() {
};

/**
 * Ueberprueft ob es in dem uebergebenen Namespache (object.unit.hero) eine passende Funktion / Klasse gibt (Empire[object][unit][hero]
 *
 * @see: https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
 *
 * @param {string} namespace
 * @param {object} context
 * @return {object}
 */
Application.prototype.createByNamespace = function(namespace, context) {
	let sections = namespace.split('.');
	let name = sections.pop();

	for(let i = 0; i < sections.length; i ++) {
		context = context[sections[i]];
	}

	return new context[name]();
};

export default Application;