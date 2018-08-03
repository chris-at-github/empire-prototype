'use strict';

let Event = {
	eventListener: [],	

	/**
	 * Registriert einen Event Listener und speichert den Callback in einem Array
	 * 
	 * @param {string} event 
	 * @param {function} callback 
	 * @return {void}
	 */
	listen: function(event, callback) {
		if(_.isUndefined(this.eventListener[event]) === false) {
			this.eventListener[event].push(callback);
		}
	},

	/**
	 * Fuehrt alle Events (Callbacks) in einer Eventgruppe aus
	 * 
	 * @param {string} event 
	 * @return {void}
	 */
	fire: function(event) {
		let settlement = this;

		_.forEach(this.eventListener[event], function(callback) {
			callback.call(settlement);
		});
	}
};

export default Event;