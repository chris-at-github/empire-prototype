'use strict';

import Application from './application';

let Settlement = function() {
	Application.call(this);
};
Settlement.prototype = Object.create(Application.prototype);

// let Settlement = 'xxx';

// let Application = function() {
// };
//
// storage.prototype.set = function(key, value) {
// 	vue.set(Game.settlements, key, value);
// };

Settlement.prototype.store = function(key, value) {
	Vue.set(Game.settlements, key, value);
};

export default Settlement;