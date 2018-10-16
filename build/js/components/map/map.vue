<template>
	<div class="map" ref="map">
		<div class="map--scroll-container" v-bind:style="styleObject" ref="scroll">
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
				// settings:     {},
				// scene:        {},
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight
			}
		},

		beforeDestroy: function() {
			window.removeEventListener('resize', this.onWindowResize)
		},

		mounted: function() {
			window.addEventListener('resize', this.onWindowResize);
			this.onWindowResize();
		},

		methods: {

			// @see: https://github.com/vuejs/vue/issues/1915
			onWindowResize() {
				console.log(this.$refs.map.clientWidth);

				this.windowWidth = this.$refs.map.clientWidth;
				this.windowHeight = this.$refs.map.clientHeight;
			},

			getMapCenterPosition: function() {
				return {
					'x': (this.windowWidth - this.getMapWidth()) / 2,
					'y': (this.windowHeight - this.getMapHeight()) / 2
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
				// this.object;
				this.getMapCenterPosition();

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