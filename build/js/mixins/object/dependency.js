'use strict';

let Dependency = {
	dependencies: [],

	/**
	 * Fuegt eine neue Objektabhaengigkeit hinzu
	 * 
	 * @param {object} dependency
	 * @return {void}
	 */
	addDependency: function(dependency) {
		this.dependencies.push(dependency);
	},

	/**
	 * Prueft alle hinterlegten Abhaengigkeiten
	 *
	 * @return {boolean}
	 */
	checkDependencies: function() {
		let object = this;
		let check = true;

		_.forEach(this.dependencies, function(dependency) {
			if(dependency.check(object) === false) {
				check = false;
			}
		});

		return check;
	}
};

export default Dependency;