<template>
	<div class="tile" v-bind:style="styleObject">
		<svg class="tile--terrain">
			<use v-bind="{'xlink:href':'#tile-' + terrain}" />
		</svg>
	</div>
</template>

<script>
	import MapHelper from '../helpers/map';

	// use xlink:href binding
	// @see: https://github.com/vuejs/vue/issues/648#issuecomment-304664977
	export default {
		mixins: [
			MapHelper
		],

		props: ['x', 'y', 'terrain'],

		data: function() {
			return {
				settings: {}
			}
		},

		computed: {
			styleObject: function() {
				return {
					'width':  this.getTileWidth() + 'px',
					'height': this.getTileHeight() + 'px',
					'left':   this.getTilePosition(this.x, this.y).x + 'px',
					'top':    this.getTilePosition(this.x, this.y).y + 'px'
				}
			}
		},

		created: function() {
			this.settings = Zeen.settings;
			this.scene = Zeen.scene;
		}
	}
</script>