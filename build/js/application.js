var vue = require('vue');

empire = {
	configuration: require('./configuration')
};

game = require('./game');

// Layout
vue.component('emp-footer', require('./components/layout/footer'));

// Game Objects
vue.component('emp-settlement-container', require('./components/settlement/container'));
vue.component('emp-settlement', require('./components/settlement/settlement'));

const application = new vue({
	el: '#application'
});