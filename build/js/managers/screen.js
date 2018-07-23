'use strict';

let Screen = function() {
};

/**
 * @param {string} name
 * @return {void}
 */
Screen.prototype.activate = function(name) {
	Game.screen = name;
};

export default Screen;