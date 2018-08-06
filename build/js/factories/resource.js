'use strict';

import ApplicationFactory from './application';

let ResourceFactory = function() {
	ApplicationFactory.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
ResourceFactory.prototype = Object.create(ApplicationFactory.prototype);

/**
 * Erzeugt eine neue Instanz zur einer Resource anhand des Namespaces
 *
 * @param {string} namespace
 * @return {object}
 */
ResourceFactory.prototype.create = function(namespace) {
	return this.createByNamespace(namespace, Empire);
	// console.log(namespace, Empire);
};

export default ResourceFactory;