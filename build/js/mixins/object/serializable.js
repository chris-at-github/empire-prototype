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
				let method = 'set' + _.capitalize(_.camelCase(key));

				// gibt es eine eigene Setter-Methode, soll diese verwendet werden
				if(typeof(object[method]) === 'function') {
					object[method](property);

				} else if(typeof(object[key]) === 'object' && typeof(object[key].fill) === 'function') {
					object[key].fill(property);

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
			let method = 'get' + _.capitalize(_.camelCase(property));

			// gibt es eine eigene Setter-Methode, soll diese verwendet werden
			if(typeof(object[method]) === 'function') {
				json[property] = object[method]();

			} else if(typeof(object[property]) === 'object' && typeof(object[property].toJson) === 'function') {
				json[property] = object[property].toJson();

			} else {
				json[property] = object[property];
			}
		});

		return json;
	}
};

export default Serializable;