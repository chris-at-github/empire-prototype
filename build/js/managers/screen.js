'use strict';

let Screen = function() {
};

/**
 * @param {string} name
 * @return {void}
 */
Screen.prototype.activate = function(name) {
	Vue.set(Game, 'screen', name);
	Game.screen = name;
	// Vue.nextTick(function() {
	// 	console.log('next tick');
	// });
	application.screen = 'XXX';

	// console.log(application.screen = 'XXX');
};

export default Screen;