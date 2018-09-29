var configuration = require('./configuration/empire');

configuration.settlement = {
	default: 'settlement.colony'
};

configuration.object = {
	buildings: [
		'building.entrance',
		'building.livingRoom',
		'building.storeRoom'
	]
};

configuration.unit = {
};

module.exports = configuration;