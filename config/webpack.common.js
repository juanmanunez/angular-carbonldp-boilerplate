const helpers = require( "./webpack.helpers" );

// Plugins
const CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
const ProvidePlugin = require( "webpack/lib/ProvidePlugin" );


module.exports = function( options ) {
	isProd = options.env === "production";
	return {
		entry: {
			"polyfills": "./src/polyfills.ts",
			"app"      : "./src/main.ts"
		},

		resolve: {
			extensions: [ ".ts", ".js" ],
			alias     : {
				"app": helpers.root( "src", "app" )
			},
			modules   : [ helpers.root( "node_modules" ) ]
		},

		// Rules for file extensions
		module: {
			rules: [
				{
					test   : /\.html$/,
					use    : "html-loader",
					exclude: [ helpers.root( "src/index.html" ) ]
				},
				{
					test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
					use : "file-loader?name=assets/[name].[hash].[ext]"
				},
				{
					test: /\.s?css$/,
					use : [ "raw-loader", "sass-loader" ]
				}
			]
		},

		plugins: [

			// It identifies the hierarchy among three chunks: app -> vendor -> polyfills
			new CommonsChunkPlugin( {
				name: [ "app", "polyfills" ]
			} ),

			// Provide global variables
			new ProvidePlugin( {
				$     : "jquery",
				jQuery: "jquery",
				jquery: "jquery"
			} )

		]
	};
};