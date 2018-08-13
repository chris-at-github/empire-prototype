'use strict';

import EmpireDependency from './empire';

let SettlementResourceDependency = function() {
	EmpireDependency.call(this);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Application}
 */
SettlementResourceDependency.prototype = Object.create(EmpireDependency.prototype);

export default SettlementResourceDependency;