'use strict';

let Serializable = {

	properties: [],	

	/**
	 * fuellt ein Objekt mit den unter this.properties definierten Eigenschaften
	 *
	 * @param {object} properties
	 * @return {void}
	 */
	fill: function(properties) {
		let settlement = this;

		_.forEach(properties, function(property, key) {
			if(_.includes(settlement.properties, key) === true) {
				let method = 'set' + _.capitalize(_.camelCase(key));

				// gibt es eine eigene Setter-Methode, soll diese verwendet werden
				if(typeof(settlement[method]) === 'function') {
					settlement[method](property);

				} else if(typeof(settlement[key]) === 'object' && typeof(settlement[key].fill) === 'function') {
					settlement[key].fill(property);

				} else {
					settlement[key] = property;
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
		let settlement = this;
		let json = {};

		// falls Qcn vorhanden, immer mit exportieren -> auch wenn nicht in den Properties definiert
		if(_.isUndefined(settlement.qcn) === false) {
			json.qcn = settlement.qcn;
		}

		_.forEach(this.properties, function(property) {
			let method = 'get' + _.capitalize(_.camelCase(property));

			// gibt es eine eigene Setter-Methode, soll diese verwendet werden
			if(typeof(settlement[method]) === 'function') {
				json[property] = settlement[method]();

			} else if(typeof(settlement[property]) === 'object' && typeof(settlement[property].toJson) === 'function') {
				json[property] = settlement[property].toJson();

			} else {
				json[property] = settlement[property];
			}
		});

		return json;
	}
};

export default Serializable;