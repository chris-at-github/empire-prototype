'use strict';

let Activate = function() {
};

/**
 * @param {string} id
 * @return {void}
 */
Activate.prototype.settlement = function(id) {
	Game.activate.settlement = id;
};

export default Activate;