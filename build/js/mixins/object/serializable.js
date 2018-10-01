'use strict';

let Serializable = {

	properties: [],

	/**
	 * Fuegt einen neuen Eintrag zu den Eigenschaften hinzu
	 *
	 * @param {string} property
	 * @return {object} Serializable
	 */
	addProperty: function(property) {
		this.properties.push(property);

		return this;
	},

	/**
	 * fuellt ein Objekt mit den unter this.properties definierten Eigenschaften
	 *
	 * @param {object} properties
	 * @return {void}
	 */
	fill: function(properties) {
		let object = this;

		_.forEach(properties, function(property, key) {
			if(_.includes(object.properties, key) === true) {
				let fillMethod = 'before' + _.capitalize(_.camelCase(key)) + 'Fill';
				let setMethod = 'set' + _.capitalize(_.camelCase(key));

				// gibt es eine eigene Setter-Methode, soll diese verwendet werden
				if(typeof(object[fillMethod]) === 'function') {
					object[fillMethod](property);

				} else if(object[key] !== null && typeof(object[key]) === 'object' && typeof(object[key].fill) === 'function') {
					object[key].fill(property);

				} else if(typeof(object[setMethod]) === 'function') {
					object[setMethod](property);

				} else {
					object[key] = property;
				}
			}
		});
	},

	/**
	 * fasst die Objekteigenschaften zu einem JSON Objekt zusammen
	 *
	 * @return {object}
	 */
	toJson: function() {
		let object = this;
		let json = {};

		// falls Qcn vorhanden, immer mit exportieren -> auch wenn nicht in den Properties definiert
		if(_.isUndefined(object.qcn) === false) {
			json.qcn = object.qcn;
		}

		_.forEach(this.properties, function(property) {
			let toJsonMethod = 'before' + _.capitalize(_.camelCase(property)) + 'ToJson';
			let getMethod = 'get' + _.capitalize(_.camelCase(property));

			if(typeof(object[toJsonMethod]) === 'function') {
				json[property] = object[toJsonMethod]();

			} else if(typeof(object[property]) === 'object' && typeof(object[property].toJson) === 'function') {
				json[property] = object[property].toJson();

			} else if(typeof(object[getMethod]) === 'function') {
				json[property] = object[getMethod]();

			} else {
				json[property] = object[property];
			}
		});

		return json;
	}
};

export default Serializable;