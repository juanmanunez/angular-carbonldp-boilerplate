const webpack = require( "webpack" );
const webpackMerge = require( "webpack-merge" );
const helpers = require( "./webpack.helpers" );
const config = require( "./prod.config.json" );
const commonConfig = require( "./webpack.common.js" );
const carbonConfig = config.carbon;
const angularConfig = config.angular;

// Plugins
const DefinePlugin = require( "webpack/lib/DefinePlugin" );
const LoaderOptionsPlugin = require( "webpack/lib/LoaderOptionsPlugin" );
const NoEmitOnErrorsPlugin = require( "webpack/lib/NoEmitOnErrorsPlugin" );
const UglifyJsPlugin = require( "webpack/lib/optimize/UglifyJsPlugin" );
const OccurenceOrderPlugin = require( "webpack/lib/optimize/OccurrenceOrderPlugin" );
const CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
const IgnorePlugin = require( "webpack/lib/IgnorePlugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const AotPlugin = require( "@ngtools/webpack" ).AotPlugin;


// Webpack Constants
const ENV = process.env.NODE_ENV = process.env.ENV = "production";
const PROTOCOL = process.env.PROTOCOL || "http";
const HOST = process.env.HOST || "127.0.0.1";
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
	},
	angular    : {
		debug: angularConfig.debug
	}
} );


module.exports = function( env ) {
	return webpackMerge( commonConfig( {
		env: ENV
	} ), {
		devtool: "source-map",

		output: {
			path             : helpers.root( "dist" ),
			publicPath       : "/",
			filename         : "[name].[chunkhash].js",
			sourceMapFilename: "[name].[chunkhash].map",
			chunkFilename    : "[id].[chunkhash].chunk.js"
		},

		module: {
			rules: [
				{
					test: /\.ts$/,
					use : [ "@ngtools/webpack" ]
				}
			]
		},

		plugins: [

			// Webpack gives IDs to identify your modules. With this plugin, Webpack will analyze and prioritize often used modules assigning them the smallest ids.
			new OccurenceOrderPlugin(),

			// Stops the build if there is any error.
			new NoEmitOnErrorsPlugin(),

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
					},
					"angular" : {
						"debug": JSON.stringify( METADATA.angular.debug )
					}
				}
			} ),

			// Minifies the bundles. https://github.com/angular/angular/issues/10618
			new UglifyJsPlugin( {
				beautify : false, //prod
				output   : {
					comments: false
				}, //prod
				mangle   : {
					keep_fnames: true,
					screw_ie8  : true
				}, //prod
				compress : {
					screw_ie8   : true,
					warnings    : false,
					conditionals: true,
					unused      : true,
					comparisons : true,
					sequences   : true,
					dead_code   : true,
					evaluate    : true,
					if_return   : true,
					join_vars   : true,
					negate_iife : false // we need this for lazy v8
				},
				sourceMap: false
			} ),

			// Set options for loaders
			new LoaderOptionsPlugin( {
				minimize: true,
				debug   : false,
				options : {
					htmlLoader: {
						//minimize: false // workaround for ng2
						minimize             : false,
						removeAttributeQuotes: false,
						caseSensitive        : true,
						customAttrSurround   : [
							[ /#/, /(?:)/ ],
							[ /\*/, /(?:)/ ],
							[ /\[?\(?/, /(?:)/ ]
						],
						customAttrAssign     : [ /\)?\]?=/ ]
					}
				}
			} ),

			// Ignore node imports
			new IgnorePlugin( /^(http|https|url|file-type)$/, /carbonldp/ ),

			// Plugin to AoT compile the app
			new AotPlugin( {
				tsConfigPath      : helpers.root( "tsconfig.json" ),
				entryModule       : helpers.root( "src/app/app.module#AppModule" ),
				mainPath          : helpers.root( "src/main.ts" ),
				skipCodeGeneration: false
			} ),

			// Webpack inject scripts and links for us with the HtmlWebpackPlugin
			new HtmlWebpackPlugin( {
				filename      : "index.html",
				template      : "src/index.html",
				chunksSortMode: "dependency",
				metadata      : METADATA
			} )
		]
	} );
};