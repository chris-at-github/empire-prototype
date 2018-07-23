window.Vue = require('vue');
window._ = require('lodash');

Empire = {
	Configuration: require('./configuration'),
};

// ScreenManager
import ScreenManager from './managers/screen';
Empire.ScreenManager = new ScreenManager();

// ActivateManager
import ActivateManager  from './managers/activate';
Empire.ActivateManager = new ActivateManager();

Game = require('./game');

// Layout
Vue.component('emp-footer', require('./components/layout/footer'));

// Game Objects
Vue.component('emp-settlement-listing', require('./components/settlement/listing'));
Vue.component('emp-settlement-form', require('./components/settlement/form'));
Vue.component('emp-settlement', require('./components/settlement/index'));

var vm = new Vue({
	el: '#application',
	data: Game
});