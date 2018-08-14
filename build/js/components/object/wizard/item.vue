<template>
	<div class="object">
		<div class="object--title">{{object.name}}</div>

		<div class="object--dependencies" v-if="getDependencies().length !== 0">
			XXX
		</div>

		<div class="object--actions">
			<ul>
				<li><button class="button" v-on:click="create">Erstellen</button></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import ObjectWizardItemDependency from './dependency';
	import ObjectStore from 'managers/storage/object';

	export default {
		components: {
			'emp-object-wizard-item-dependency': ObjectWizardItemDependency
		},

		data: function() {
			return {
				parent: this.$parent.parent,
				store: this.$parent.store
			};
		},

		props: ['qcn'],

		computed: {
			object: function() {
				return Empire.factory.object.create(this.qcn);
			},

			dependencies: function() {
				return this.object.getDependencies();
			}
		},

		methods: {
			create: function() {
				let object = Empire.factory.object.create(this.qcn);
						object.fill(this.toJson());

				let manager = new ObjectStore();
						manager.setStorage(this.store);
						manager.store(object);
			},

			toJson: function() {
				return  {
					qcn: this.qcn,
					parent: this.parent
				}
			},

			getDependencies: function() {
				return this.object.getDependencies();
			}
		}
	}
</script>