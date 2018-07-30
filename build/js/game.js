module.exports = {
	screen: 'settlement',
	activate: {
		settlement: '0363dec2-e331-4e64-9b06-dce06941095c'
	},
	settlements: {
		'0363dec2-e331-4e64-9b06-dce06941095c': {
			id: '0363dec2-e331-4e64-9b06-dce06941095c',
			name: 'Blatthausen',
			object: 'settlement.colony'
		}
	},
	buildings: {
		'c999ae6b-d5cc-46fb-91c3-dccf2860f56d': {
			id: 'c999ae6b-d5cc-46fb-91c3-dccf2860f56d',
			object: 'building.settlement.entrance',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c'
		}
	}
};