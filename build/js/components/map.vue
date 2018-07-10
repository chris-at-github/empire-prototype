<template>
	<div class="map" v-bind:style="styleObject">
		<div class="map--tile-container">
			<cs-tile
				 v-for="(tile, index) in tiles"
				 v-bind:x="tile.x"
				 v-bind:y="tile.y"
				 v-bind:terrain="tile.terrain"
				 v-bind:key="index">
			</cs-tile>
		</div>

		<div class="map--object-container">
			<cs-object
				v-for="(object, index) in objects"
				v-bind:id="object.id"
				v-bind:position="object.position"
				v-bind:size="object.size"
				v-bind:key="index">
			</cs-object>
		</div>
	</div>
</template>

<script>
	import MapHelper from '../helpers/map';
	import Tile from './tile';
	import Object from './object'

	export default {
		mixins: [
			MapHelper
		],

		// @see: https://vuejs.org/v2/guide/components.html#Local-Registration
		components: {
			'cs-tile': Tile,
			'cs-object': Object
		},

		data: function() {
			return {
				settings:     {},
				scene:        {},
				windowWidth:  window.innerWidth,
				windowHeight: window.innerHeight
			}
		},

		beforeDestroy: function() {
			window.removeEventListener('resize', this.onWindowResize)
		},

		mounted() {
			window.addEventListener('resize', this.onWindowResize);
		},

		methods: {

			// @see: https://github.com/vuejs/vue/issues/1915
			onWindowResize(event) {
				this.windowWidth = event.currentTarget.innerWidth;
				this.windowHeight = event.currentTarget.innerHeight;
			},

			getMapCenterPosition: function() {
				return {
					'x': (this.windowWidth - this.getMapWidth()) / 2,
					'y': (this.windowHeight - this.getMapHeight()) / 2
				};
			}
		},

		computed: {
			styleObject: function() {
				return {
					'width': this.getMapWidth() + 'px',
					'height': this.getMapHeight() + 'px',
					'top': this.getMapCenterPosition().y + 'px',
					'left': this.getMapCenterPosition().x + 'px'
				}
			},

			tiles: function() {
				return this.scene.tiles;
			},

			objects: function() {
				return this.scene.objects;
			}
		},

		created: function() {
			this.settings = Zeen.settings;
			this.scene = Zeen.scene;
		}
	}
</script>