import _ from 'lodash';

export default {
	data: function() {},

	// Calculate tile sizes and positions
	// @see: http://clintbellanger.net/articles/isometric_math/
	methods: {
		getMaxX: function() {
			return _.maxBy(this.scene.tiles, function(tile) {
				return tile.x;
			}).x;
		},

		getMaxY: function() {
			return _.maxBy(this.scene.tiles, function(tile) {
				return tile.y;
			}).y;
		},

		getMapWidth: function() {

			// @see: https://stackoverflow.com/questions/4615116/how-to-calculate-the-height-and-width-of-an-isometric-rectangle-square#answer-4618210
			return ((this.getMaxX() + this.getMaxY()) * (this.getTileWidth() / 2));
		},

		getMapHeight: function() {
			return ((this.getMaxX() + this.getMaxY()) * (this.getTileHeight() / 2));
		},

		getMapTileOffset: function() {

			// this only works if map.x = map.y
			return {
				'x': (this.getMapWidth() / 2) - (this.getTileWidth() / 2),
				'y': this.getTileHeight()
			}
		},

		getTileWidth: function() {
			return this.settings.tile.size;
		},

		getTileHeight: function() {
			return this.settings.tile.size / 2;
		},

		getTilePosition: function(x, y) {
			return {
				'x': (x - y) * (this.getTileWidth() / 2) + this.getMapTileOffset().x,
				'y': (x + y) * (this.getTileHeight() / 2) - this.getMapTileOffset().y
			};
		},

		getTileCenterPosition: function(x, y) {
			return {
				'x': this.getTilePosition(x, y).x + (this.getTileWidth() / 2),
				'y': this.getTilePosition(x, y).y + (this.getTileHeight() / 2)
			};
		}
	}
};