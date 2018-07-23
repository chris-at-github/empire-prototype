var mix = require('laravel-mix');

// Stopping at 95% emitting
// @see: https://github.com/JeffreyWay/laravel-mix/issues/1126
mix.setPublicPath('public');

// No Noise
// @see: https://laravel.com/docs/5.6/mix#notifications
mix.disableSuccessNotifications();


// Import statements without relative paths
// @see: https://moduscreate.com/blog/es6-es2015-import-no-relative-path-webpack/
mix.webpackConfig({
	resolve: {
		modules: [
			path.resolve('./build/js'),
			path.resolve('./node_modules')
		]
	},
	output: {
		publicPath: '/',
		chunkFilename: 'cache/[name].js'
	},
});

/*
	----------------------------------------------------------------------------------------------------------------------
	Mix Asset Management

	Mix provides a clean, fluent API for defining some Webpack build steps for your Laravel application. By default,
	we are compiling the Sass file for the application as well as bundling up all the JS files.
*/
mix.js('build/js/application.js', 'public/js')
	.sass('build/scss/application.scss', 'public/css');