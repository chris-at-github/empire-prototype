<template>
	<div class="map" ref="map">
		<div class="map--alignment" v-bind:style="styleObject" ref="alignment">
			<!--<div class="map&#45;&#45;tile-container">-->
			<!--<cs-tile-->
			<!--v-for="(tile, index) in tiles"-->
			<!--v-bind:x="tile.x"-->
			<!--v-bind:y="tile.y"-->
			<!--v-bind:terrain="tile.terrain"-->
			<!--v-bind:key="index">-->
			<!--</cs-tile>-->
			<!--</div>-->

			<!--<div class="map&#45;&#45;object-container">-->
			<!--<cs-object-->
			<!--v-for="(object, index) in objects"-->
			<!--v-bind:id="object.id"-->
			<!--v-bind:position="object.position"-->
			<!--v-bind:size="object.size"-->
			<!--v-bind:key="index">-->
			<!--</cs-object>-->
			<!--</div>-->
		</div>
	</div>
</template>

<script>
	// import MapHelper from '../helpers/map';
	// import Tile from './tile';
	// import Object from './object'

	export default {
		// mixins: [
		// 	MapHelper
		// ],

		// @see: https://vuejs.org/v2/guide/components.html#Local-Registration
		// components: {
		// 	'cs-tile': Tile,
		// 	'cs-object': Object
		// },
		props: ['properties'],

		data: function() {
			return {
				containerWidth: 0,
				containerHeight: 0
			}
		},

		beforeDestroy: function() {
			window.removeEventListener('resize', this.adjustContainerAlignment)
		},

		mounted: function() {
			window.addEventListener('resize', this.adjustContainerAlignment);
			window.addEventListener('load', this.adjustContainerAlignment);
		},

		methods: {

			// @see: https://github.com/vuejs/vue/issues/1915
			adjustContainerAlignment() {
				this.containerWidth = this.$refs.map.clientWidth;
				this.containerHeight = this.$refs.map.clientHeight;
			},

			getMapCenterPosition: function() {
				return {
					'x': (this.containerWidth - this.getMapWidth()) / 2,
					'y': (this.containerHeight - this.getMapHeight()) / 2
				};
			},

			getMaxX: function() {
				return _.maxBy(Object.values(this.properties.tiles), function(tile) {
					return tile.x;
				}).x;
			},

			getMaxY: function() {
				return _.maxBy(Object.values(this.properties.tiles), function(tile) {
					return tile.y;
				}).y;
			},

			getMapWidth: function() {
				return (this.getMaxX() * this.getTileSize());
			},

			getMapHeight: function() {
				return (this.getMaxY() * this.getTileSize());
			},

			getTileSize: function() {
				return 100;
			}
		},

		computed: {
			object: function() {
				let object = Empire.factory.map.create(this.properties.qcn);
						object.fill(this.properties);

				return object;
			},

			styleObject: function() {
				return {
					'width': this.getMapWidth() + 'px',
					'height': this.getMapHeight() + 'px',
					'top': this.getMapCenterPosition().y + 'px',
					'left': this.getMapCenterPosition().x + 'px'
				};
			},

			tiles: function() {
				// return this.scene.tiles;
			},

			objects: function() {
				// return this.scene.objects;
			}
		}
	}
</script>