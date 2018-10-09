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

configuration.expedition = {
	resources: [
		'resource.wood',
		'resource.food',
		'resource.stone',
		'resource.water'
	]
};

module.exports = configuration;