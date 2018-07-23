'use strict';

import Application from 'managers/storage/application';

// Settlement Storage Manager
// Extends Application Storage Manager
let Settlement = function() {
	Application.call(this);
	this.storage = Game.settlements;
};
Settlement.prototype = Object.create(Application.prototype);

Settlement.prototype.store = function(settlement) {
	return this._store(settlement);
};

export default Settlement;