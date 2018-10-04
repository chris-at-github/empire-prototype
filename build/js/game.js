module.exports = {
	turn: 1,
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
				'resource.water': 5,
				'resource.stone': 5,
				'resource.wood': 5,
				'resource.food': 5
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
		'c1b94f80-87b9-421d-a76a-07ac14cf6983': {
			id:     'c1b94f80-87b9-421d-a76a-07ac14cf6983',
			qcn:    'unit.worker',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			actionPoints: 100
		},
		'3e000db1-c7ec-4b06-8dc9-f6609bd0ae8c': {
			id: '3e000db1-c7ec-4b06-8dc9-f6609bd0ae8c',
			qcn: 'unit.worker',
			parent: '0363dec2-e331-4e64-9b06-dce06941095c',
			actionPoints: 100
		}
	},
	expeditions: {
		'eadb0907-0343-4d64-be73-89431d71ccc6': {
			id: 'eadb0907-0343-4d64-be73-89431d71ccc6',
			type: 'expedition.type.search',
			state: 'expedition.state.returnToSettlement',
			unit: '3e000db1-c7ec-4b06-8dc9-f6609bd0ae8c',
			settlement: '0363dec2-e331-4e64-9b06-dce06941095c',
			resources: {
				'resource.wood': 1
			}
		}
	}
};