var vue = require('vue');

empire = {
	configuration: require('./configuration')
};

// Layout
vue.component('emp-footer', require('./components/layout/footer'));

// Game Objects
// vue.component('emp-settlement', require('./components/settlement.vue'));

const application = new vue({
	el: '#application'
});