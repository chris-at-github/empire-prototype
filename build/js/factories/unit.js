'use strict';

import EmpireFactory from './application';

let UnitFactory = function() {
	EmpireFactory.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
UnitFactory.prototype = Object.create(EmpireFactory.prototype);

/**
 * Erzeugt eine neue Instanz zur einem Objekt anhand des Namespaces
 *
 * @param {string} namespace
 * @return {object}
 */
UnitFactory.prototype.create = function(namespace) {
	return this.createByNamespace(namespace, Empire);
};

export default UnitFactory;