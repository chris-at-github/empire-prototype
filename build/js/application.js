window.Vue = require('vue');
window._ = require('lodash');

Empire = {
	Configuration: require('./configuration'),
};

// ScreenManager
import ScreenManager from './managers/screen';
Empire.ScreenManager = new ScreenManager();

Game = require('./game');

// Layout
Vue.component('emp-footer', require('./components/layout/footer'));

// Game Objects
Vue.component('emp-settlement-listing', require('./components/settlement/listing'));
Vue.component('emp-settlement-form', require('./components/settlement/form'));
Vue.component('emp-settlement', require('./components/settlement/settlement'));

var vxx = new Vue({
	el: '#application',
	data: Game
});

// setTimeout(function() {
// 	vm.screen = 'settlement';
// 	Game.screen = 'battle';
// }, 1000);
