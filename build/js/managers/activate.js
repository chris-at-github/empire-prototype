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

/**
 * @return {string}
 */
Activate.prototype.getSettlement = function() {
	return Game.activate.settlement;
};

export default Activate;