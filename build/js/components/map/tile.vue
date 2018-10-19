<template>
	<div class="tile" v-bind:style="styleObject">
		<!--
		<svg class="tile--terrain">
			<use v-bind="{'xlink:href':'#tile-' + terrain}" />
		</svg>
		-->
	</div>
</template>

<script>
	// import MapHelper from '../helpers/map';

	// use xlink:href binding
	// @see: https://github.com/vuejs/vue/issues/648#issuecomment-304664977
	export default {
		// mixins: [
		// 	MapHelper
		// ],

		props: ['x', 'y', 'properties', 'size'],

		data: function() {
			return {
				settings: {}
			}
		},

		computed: {
			styleObject: function() {
				return {
					'width': this.size + 'px',
					'height': this.size + 'px',
					'left': '0px',
					'top': '0px'
				}
				// return {
				// 	'width':  this.getTileWidth() + 'px',
				// 	'height': this.getTileHeight() + 'px',
				// 	'left':   this.getTilePosition(this.x, this.y).x + 'px',
				// 	'top':    this.getTilePosition(this.x, this.y).y + 'px'
				// }
			}
		}
	}
</script>