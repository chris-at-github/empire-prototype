module.exports = {
	screen: 'settlement',
	activate: {
		settlement: '0363dec2-e331-4e64-9b06-dce06941095c'
	},
	settlements: {
		'0363dec2-e331-4e64-9b06-dce06941095c': {
			id: '0363dec2-e331-4e64-9b06-dce06941095c',
			name: 'Blatthausen',
			qcn: 'settlement.colony',
			resources: {
				'resource.water': 8,
				'resource.stone': 12,
				'resource.wood': 7,
				'resource.food': 15
			}
		}
	},
	buildings: {
		'c999ae6b-d5cc-46fb-91c3-dccf2860f56d': {
			id: 'c999ae6b-d5cc-46fb-91c3-dccf2860f56d',
			qcn: 'building.entrance',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c'
		},
		'2c872351-e7b6-4998-aaf1-ac1c9513d9a6': {
			id: '2c872351-e7b6-4998-aaf1-ac1c9513d9a6',
			qcn: 'building.livingRoom',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c'
		},
		'938f3cc9-a14e-4f74-9768-3d348b0a65df': {
			id: '938f3cc9-a14e-4f74-9768-3d348b0a65df',
			qcn: 'building.livingRoom',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c'
		},
		'1f60519b-adea-4c2f-b780-f81c6e5b68ad': {
			id: '1f60519b-adea-4c2f-b780-f81c6e5b68ad',
			qcn: 'building.storeRoom',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c'
		}
	}
};