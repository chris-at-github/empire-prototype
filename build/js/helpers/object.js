export default {
	methods: {
		getObjectPosition: function() {
			return {
				'x': this.getTileCenterPosition(this.position.x, this.position.y).x + this.position.offset.x,
				'y': this.getTileCenterPosition(this.position.x, this.position.y).y - this.size.height - this.position.offset.y
			};
		},
	}
};