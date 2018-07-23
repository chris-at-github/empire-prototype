'use strict';

let Screen = function() {
};

// 'Konstanten' Definition
Screen.prototype.WORLD = 'world';
Screen.prototype.SETTLEMENT = 'settlement';

/**
 * @param {string} name
 * @return {void}
 */
Screen.prototype.activate = function(name) {
	Game.screen = name;
};

export default Screen;