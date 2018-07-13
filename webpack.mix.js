var mix = require('laravel-mix');

// Stopping at 95% emitting
// @see: https://github.com/JeffreyWay/laravel-mix/issues/1126
mix.setPublicPath('public');

// No Noise
// @see: https://laravel.com/docs/5.6/mix#notifications
mix.disableSuccessNotifications();

/*
	----------------------------------------------------------------------------------------------------------------------
	Mix Asset Management

	Mix provides a clean, fluent API for defining some Webpack build steps for your Laravel application. By default,
	we are compiling the Sass file for the application as well as bundling up all the JS files.
*/
mix.js('build/js/application.js', 'public/js')
	.sass('build/scss/application.scss', 'public/css');