'use strict';

let Activate = function() {
};

/**
 * @param {string} id
 * @return {void}
 */
Activate.prototype.activateSettlement = function(id) {
	Game.activate.settlement = id;
};

/**
 * @return {void}
 */
Activate.prototype.deactivateSettlement = function() {
	Game.activate.settlement = null;
};

export default Activate;