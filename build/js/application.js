// Global libraries
window.Vue = require('vue');
window._ = require('lodash');

require('filter');


// Empire environment
import event from './events/empire';
import managers from './managers/manager';
import factories from './factories/factory';
import objects from './objects/object';
import units from './units/unit';
import resources from './resources/resource';
import expedition from './expeditions/bootstrap';

Empire.configuration = require('./configuration');
Empire.manager = managers;
Empire.factory = factories;
Empire.object = objects;
Empire.unit = units;
Empire.resource = resources;
Empire.expedition = expedition;

Game = require('./game');

let ex = new Empire.expedition();
		ex.fill(Game.expeditions['eadb0907-0343-4d64-be73-89431d71ccc6']);

console.log(ex.toJson());

// Layout
Vue.component('emp-footer', require('./components/layout/footer'));

// Game Objects
Vue.component('emp-settlement-listing', require('./components/settlement/listing'));
Vue.component('emp-settlement-form', require('./components/settlement/form'));
Vue.component('emp-settlement', require('./components/settlement/index'));

var vm = new Vue({
	el: '#application',
	data: Game,
	created: function() {
		Empire.event.fire(Empire.event.EVENT_CREATE_APPLICATION);
	}
});