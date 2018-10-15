'use strict';

import EmpireFactory from './application';

let MapFactory = function() {
	EmpireFactory.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
MapFactory.prototype = Object.create(EmpireFactory.prototype);

/**
 * Erzeugt eine neue Instanz zur einer Map anhand des Namespaces
 *
 * @param {string} namespace
 * @return {object}
 */
MapFactory.prototype.create = function(namespace) {
	return this.createByNamespace(namespace, Empire);
};

export default MapFactory;