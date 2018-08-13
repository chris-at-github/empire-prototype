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
	}
};

export default Dependency;