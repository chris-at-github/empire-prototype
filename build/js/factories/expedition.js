'use strict';

import EmpireFactory from './application';

let ExpeditionFactory = function() {
	EmpireFactory.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
ExpeditionFactory.prototype = Object.create(EmpireFactory.prototype);

/**
 * Erzeugt eine neue Instanz zur einer Expedition
 *
 * @return {object} EmpireExpedition
 */
ExpeditionFactory.prototype.create = function() {
	return new Empire.expedition();
};

export default ExpeditionFactory;