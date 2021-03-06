module.exports = {
	turn: 1,
	screen: 'world',
	activate: {
		settlement: null
	},
	settlements: {
		'0363dec2-e331-4e64-9b06-dce06941095c': {
			id: '0363dec2-e331-4e64-9b06-dce06941095c',
			name: 'Blatthausen',
			qcn: 'settlement.colony',
			resources: {
				'resource.water': 49,
				'resource.stone': 20,
				'resource.wood': 20,
				'resource.food': 20
			},
			unitIncreamentStatus: 0.75
		}
	},
	buildings: {
		'c999ae6b-d5cc-46fb-91c3-dccf2860f56d': {
			id: 'c999ae6b-d5cc-46fb-91c3-dccf2860f56d',
			qcn: 'building.entrance',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			constructionState: 'object.constructionState.created'
		},
		'2c872351-e7b6-4998-aaf1-ac1c9513d9a6': {
			id: '2c872351-e7b6-4998-aaf1-ac1c9513d9a6',
			qcn: 'building.livingRoom',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			constructionState: 'object.constructionState.underConstruction',
			constructionPointsCreated: 50,
			units: ['802afac4-2288-450f-b46e-778bf5e6af63']
		},
		'1f60519b-adea-4c2f-b780-f81c6e5b68ad': {
			id: '1f60519b-adea-4c2f-b780-f81c6e5b68ad',
			qcn: 'building.storeRoom',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			constructionState: 'object.constructionState.created'
		},
		'8207762f-5a13-4265-a66b-ce6cf6459fe2': {
			id: '8207762f-5a13-4265-a66b-ce6cf6459fe2',
			qcn: 'building.storeRoom',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			constructionPointsCreated: 0,
			constructionState: 'object.constructionState.planned'
		},
	},
	units: {
		'802afac4-2288-450f-b46e-778bf5e6af63': {
			id: '802afac4-2288-450f-b46e-778bf5e6af63',
			qcn: 'unit.worker',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			actionPoints: 100
		},
		'7f10de8d-b44f-44b2-83c7-28bb333c61e2': {
			id:     '7f10de8d-b44f-44b2-83c7-28bb333c61e2',
			qcn:    'unit.worker',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			actionPoints: 100
		},
		'b952cc95-4bbe-431e-b852-183995bd9734': {
			id:     'b952cc95-4bbe-431e-b852-183995bd9734',
			qcn:    'unit.worker',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			actionPoints: 100
		},
		'3e000db1-c7ec-4b06-8dc9-f6609bd0ae8c': {
			id: '3e000db1-c7ec-4b06-8dc9-f6609bd0ae8c',
			qcn: 'unit.collector',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			actionPoints: 100
		}
	},
	expeditions: {
		'eadb0907-0343-4d64-be73-89431d71ccc6': {
			id: 'eadb0907-0343-4d64-be73-89431d71ccc6',
			type: 'expedition.type.search',
			state: 'expedition.state.unloadOnHold',
			unit: '3e000db1-c7ec-4b06-8dc9-f6609bd0ae8c',
			settlement: '0363dec2-e331-4e64-9b06-dce06941095c',
			resources: {
				'resource.water': 1
			},
			automatic: false
		}
	},
	map: {
		id: '44561c9f-7a2b-4a2e-9c56-6cc7e8e559c7',
		qcn: 'map.world',
		tiles: {
			'1-1': {
				x: 1,
				y: 1,
				qcn: 'tile.default'
			},
			'2-1': {
				x: 2,
				y: 1,
				qcn: 'tile.default'
			},
			'3-1': {
				x: 3,
				y: 1,
				qcn: 'tile.default'
			},
			'1-2': {
				x: 1,
				y: 2,
				qcn: 'tile.default'
			},
			'2-2': {
				x: 2,
				y: 2,
				qcn: 'tile.default'
			},
			'3-2': {
				x: 3,
				y: 2,
				qcn: 'tile.default'
			},
			'1-3': {
				x: 1,
				y: 3,
				qcn: 'tile.default'
			},
			'2-3': {
				x: 2,
				y: 3,
				qcn: 'tile.default'
			},
			'3-3': {
				x: 3,
				y: 3,
				qcn: 'tile.default'
			}
		}
	}
};