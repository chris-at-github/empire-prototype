'use strict';

import ApplicationSettlement from './application';

let ColonySettlement = function() {
	ApplicationSettlement.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {ApplicationStore}
 */
ColonySettlement.prototype = Object.create(ApplicationSettlement.prototype);

ColonySettlement.prototype.test = function() {
	console.log('Colony::test');
};

export default ColonySettlement;