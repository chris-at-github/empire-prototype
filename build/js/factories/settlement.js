'use strict';

import Application from './application';

let Settlement = function() {
	Application.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
Settlement.prototype = Object.create(Application.prototype);

/**
 * Erzeugt eine neue Instanz zur einem Objekt anhand des Namespaces
 *
 * @param {string} namespace
 * @return {object}
 */
Settlement.prototype.create = function(namespace) {
	return this.createByNamespace(namespace, Empire.object);
};

export default Settlement;