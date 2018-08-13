'use strict';

let Dependency = {
	dependencies: [],

	/**
	 * Fuegt eine neue Objektabhaengigkeit hinzu
	 * 
	 * @param {object} event
	 * @param {function} callback 
	 * @return {void}
	 */
	addDependency: function(dependency) {
		this.dependencies.push(dependency);
	}
};

export default Dependency;