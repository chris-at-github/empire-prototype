// Global libraries
window.Vue = require('vue');
window._ = require('lodash');


// Empire environment
import event from './events/empire';
import managers from './managers/manager';
import factories from './factories/factory';
import objects from './objects/object';
import units from './units/unit';
import resources from './resources/resource';

Empire.configuration = require('./configuration');
Empire.manager = managers;
Empire.factory = factories;
Empire.object = objects;
Empire.unit = units;
Empire.resource = resources;

Game = require('./game');

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