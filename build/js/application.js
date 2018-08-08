// Global libraries
window.Vue = require('vue');
window._ = require('lodash');

// Empire environment
import managers from './managers/manager';
import factories from './factories/factory';
import objects from './objects/object';
import resources from './resources/resource';

Empire = {
	configuration: require('./configuration'),
	manager: managers,
	factory: factories,
	object: objects,
	resource: resources
};

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


// import ResourceValue from './resources/value';
// import ResourceCollection from './resources/collection';
//
// let waterResource = new ResourceValue('resource.water', 5.5);
// let collection = new ResourceCollection();
// collection.setMaxValue(20);
//
// //collection.setResource(waterResource);
// collection.fill({
// 	'resource.water': 8,
// 	'resource.stone': 12,
// 	'resource.wood': 7,
// 	'resource.food': 17
// });
// collection.subResourceValue(waterResource);
//
// console.log(collection.toJson());
//
//
// // let water = Empire.factory.resource.create('resource.water');
// // console.log(waterResource);