'use strict';

import Collection from './collection';

let ForeignCollection = function(options = {}) {
	Collection.call(this, options);
};

/**
 * Vererbung der Application Eigenschaften und Methoden
 *
 * @type {Collection}
 */
ForeignCollection.prototype = Object.create(Collection.prototype);

/**
 * Exportiert von saemtlichen Eintraegen die Schluessel als Array
 *
 * @return {array}
 */
ForeignCollection.prototype.toJson = function() {
	return this.keys();
};

export default ForeignCollection;