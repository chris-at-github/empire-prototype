// Global libraries
window.Vue = require('vue');
window._ = require('lodash');

// Empire environment
import managers from './managers/manager';
import factories from './factories/factory';
import objects from './objects/object';

Empire = {
	Configuration: require('./configuration'),
	Managers: managers,
	factory: factories,
	object: objects
};

// // console.log(Empire);
//
// // Empire.Objects = {};
// // import * as {Empire.Objects} from './objects/settlement/colony';
// import SettlementFactory from './factories/settlement';
// Empire.SettlementFactory = new SettlementFactory();
// // console.log(Empire.SettlementFactory.create('settlement.colony'));

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