// import Vue from 'vue';
//
var storageManager = function() {
};

storageManager.prototype.set = function(key, value) {
	vue.set(Game.settlements, key, value);
};

module.exports = storageManager;