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

		// Settings to state the name and location of resulting files
		output: {
			path             : helpers.root( "dist" ),
			publicPath       : "http://" + HOST + ":" + PORT + "/",
			filename         : "[name].js",
			sourceMapFilename: "[file].map",
			chunkFilename    : "[id].chunk.js"
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

		// Dev server configuration
		devServer: {
			port              : METADATA.port,
			host              : METADATA.host,
			historyApiFallback: true,
			watchOptions      : {
				aggregateTimeout: 300,
				poll            : 1000
			}
		}

	} );
};