window.vue = require('vue');

Empire = {
	Configuration: require('./configuration'),
};

require('./managers/storage');

console.log(Empire.StorageManager);

Game = require('./game');

// Layout
vue.component('emp-footer', require('./components/layout/footer'));

// Game Objects
vue.component('emp-settlement-container', require('./components/settlement/container'));
vue.component('emp-settlement-form', require('./components/settlement/form'));
vue.component('emp-settlement', require('./components/settlement/settlement'));

const application = new vue({
	el: '#application'
});