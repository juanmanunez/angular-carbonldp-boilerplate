const webpack = require( "webpack" );
const commonConfig = require( "./webpack.common.js" );
const helpers = require( "./webpack.helpers" );
const config = require( "./dev.config.json" );
const carbonConfig = config.carbon;
const angularConfig = config.angular;
const webpackMerge = require( "webpack-merge" );


// Plugins
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const DefinePlugin = require( "webpack/lib/DefinePlugin" );
const CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
const ContextReplacementPlugin = require( "webpack/lib/ContextReplacementPlugin" );


// Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = "development";
const PROTOCOL = process.env.PROTOCOL || "http";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge( commonConfig( { env: ENV } ).metadata, {
	baseUrl    : config.url.base,
	protocol   : PROTOCOL,
	host       : HOST,
	port       : PORT,
	ENV        : ENV,
	isDevServer: helpers.isWebpackDevServer(),
	carbon     : {
		protocol: carbonConfig.protocol,
		domain  : carbonConfig.domain,
		app     : {
			slug: carbonConfig.app.slug
		}
	},
	angular    : {
		debug: angularConfig.debug
	}
} );

module.exports = function( options ) {
	return webpackMerge( commonConfig( { env: ENV } ), {
		devtool: "source-map",

		// Rules to resolve Typescript files. We separate .ts resolver from common config because prod uses another loader
		module: {
			rules: [
				{
					test: /\.ts$/,
					use : [ "awesome-typescript-loader", "angular2-template-loader", "angular-router-loader" ]
				}
			]
		},

		// Plugins to bundle the app
		plugins: [

			// Workaround for angular/angular#11580
			new ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				///angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, //<- For Angular v2.x
				/angular(\\|\/)core(\\|\/)@angular/, // <- For Angular v4.x
				helpers.root( "./src" ), // location of your src
				{} // a map of your routes
			),

			// Allows you to create global constants which can be configured at compile time
			new DefinePlugin( {
				"ENV"        : JSON.stringify( METADATA.ENV ),
				"process.env": {
					"baseUrl" : JSON.stringify( METADATA.baseUrl ),
					"ENV"     : JSON.stringify( METADATA.ENV ),
					"NODE_ENV": JSON.stringify( METADATA.ENV ),
					"carbon"  : {
						"protocol": JSON.stringify( METADATA.carbon.protocol ),
						"domain"  : JSON.stringify( METADATA.carbon.domain ),
						"app"     : {
							"slug": JSON.stringify( METADATA.carbon.app.slug )
						}
					},
					"angular" : {
						"debug": JSON.stringify( METADATA.angular.debug )
					}
				}
			} ),

			// Webpack inject scripts and links for us with the HtmlWebpackPlugin
			new HtmlWebpackPlugin( {
				filename      : "index.html",
				template      : "src/index.html",
				chunksSortMode: "dependency",
				metadata      : METADATA
			} )
		],

		// Settings to state the name and location of resulting files
		output: {
			path             : helpers.root( "dist" ),	// The output directory as an absolute path
			filename         : "[name].js",				// The name of each output bundle
			sourceMapFilename: "[file].map",			// Only used when devtool uses a SourceMap option which writes an output file
			chunkFilename    : "[id].chunk.js"			// Determines the name of non-entry chunk files

		},

		// Dev server configuration
		devServer: {
			open              : true,			// Opens web browser
			port              : METADATA.port,	// Port of project
			host              : METADATA.host,	// Host of project
			historyApiFallback: true,			// Server index.html page when 404 responses
			watchOptions      : {
				aggregateTimeout: 300,			// Add a delay in milliseconds before rebuilding
				poll            : 1000			// Check for changes every second
			},
			inline            : true			// A script will be inserted in index.html to take care of live reloading, and build messages will appear in the browser console
		}

	} );
};