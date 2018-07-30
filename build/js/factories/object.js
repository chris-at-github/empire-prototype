'use strict';

import ApplicationFactory from './application';

let ObjectFactory = function() {
	ApplicationFactory.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
ObjectFactory.prototype = Object.create(ApplicationFactory.prototype);

/**
 * Erzeugt eine neue Instanz zur einem Objekt anhand des Namespaces
 *
 * @param {string} namespace
 * @return {object}
 */
ObjectFactory.prototype.create = function(namespace) {
	return this.createByNamespace(namespace, Empire.object);
};

export default ObjectFactory;