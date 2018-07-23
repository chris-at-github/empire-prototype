window.Vue = require('vue');
window._ = require('lodash');

Empire = {
	Configuration: require('./configuration'),
};

Game = require('./game');

// Layout
Vue.component('emp-footer', require('./components/layout/footer'));

// Game Objects
Vue.component('emp-settlement-container', require('./components/settlement/container'));
Vue.component('emp-settlement-form', require('./components/settlement/form'));
Vue.component('emp-settlement', require('./components/settlement/settlement'));

const application = new Vue({
	el: '#application'
});