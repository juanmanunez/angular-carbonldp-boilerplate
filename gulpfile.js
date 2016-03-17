"use strict";

const gulp = require( "gulp" );
const webserver = require( "gulp-webserver" );

const config = {
	nodeDependencies: [
		"node_modules/es6-shim/es6-shim.js",
	    "node_modules/systemjs/dist/system-polyfills.src.js",
	    "node_modules/angular2/bundles/angular2-polyfills.js",
	    "node_modules/systemjs/dist/system.src.js",
	    "node_modules/rxjs/bundles/Rx.js",
	]
};

gulp.task( "copy-node-dependencies", () => {
	return gulp.src( config.nodeDependencies ).pipe( gulp.dest( "src/assets/node_modules" ) );
});

gulp.task( "serve", () => {
	return gulp.src( "." )
		.pipe( webserver({
			livereload: false,
			directoryListing: false,
			fallback: "/src/index.html",
			open: true,
		}) );
});