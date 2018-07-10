var vue = require('vue');

empire = {
	store: {
	}
};

vue.component('emp-settlement', require('./components/settlement.vue'));

const application = new vue({
	el: '#application'
});