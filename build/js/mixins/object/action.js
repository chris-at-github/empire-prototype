'use strict';

let Action = {

	/**
	 * @type Collection
	 */
	actions: null,

	/**
	 * Fuegt einen neuen Eintrag zu den Eigenschaften hinzu
	 *
	 * @param {object} action EmpireAction
	 * @return {object} Action
	 */
	addAction: function(action) {
		this.actions.set(action.getName(), action);

		return this;
	},

	/**
	 * Liefert eine bestimmte Action, anhand des Namens zurueck
	 *
	 * @param {string} name
	 * @return {object} EmpireAction
	 */
	getAction: function(name) {
		return this.actions.get(name);
	},

	/**
	 * Liefert alle hinterlegten Actions zurueck
	 *
	 * @param {object} options
	 * @return {object} Collection (EmpireAction)
	 */
	getActions: function(options = {}) {
		let actions = this.actions.all();

		if(_.size(options) !== 0) {

		}

		return actions;
	}
};

export default Action;