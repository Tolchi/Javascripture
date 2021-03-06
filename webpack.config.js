/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	autoprefixer = require( 'autoprefixer' ),
	NODE_ENV = process.env.NODE_ENV || 'development',
	path = require( 'path' );

var config = {
	entry: {
		'bundle' : [
			'./src'
		]
	},

	output: {
		path: path.join( __dirname, 'build' ),
		publicPath: '/build/',
		filename: '[name].js',
		devtoolModuleFilenameTemplate: 'app:///[resource-path]'
	},

	postcss() {
		return [ autoprefixer ];
	},

	module: {
		loaders: [
			{
				test:   /\.jsx?$/,
				loader: 'babel-loader',
				include: path.join( __dirname, '/src' )
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.scss$/,
				loaders: [
					'isomorphic-style',
					'css?modules&importLoaders=1&localIdentName=[path][local]&camelCase=dashes&sourceMap',
					'postcss',
					'sass?sourceMap'
				]
			}
		],
	},
	resolve: {
		extensions: [ '', '.json', '.js', '.jsx' ]
	},
	node: {
		console: false,
		process: true,
		global: true,
		Buffer: true,
		__filename: 'mock',
		__dirname: 'mock',
		fs: 'empty'
	},
	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
				BROWSER: JSON.stringify( true )
			}
		} )
	]
};

if ( process.env.NODE_ENV !== 'production' ) {
	// Switches loaders to debug mode. This is required to make CSS hot reloading works correctly (see
	// http://bit.ly/1VTOHrK for more information).
	config.debug = true;

	// Enables source maps
	config.devtool = 'eval';

	config.devServer = {
		hot: true,
		port: 7777,
		historyApiFallback: true
	};

	config.module.loaders.unshift( {
		test:   /\.jsx?$/,
		loader: 'react-hot',
		include: path.join( __dirname, '/src' )
	} );
}

if ( NODE_ENV === 'production' ) {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin( {
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		} )
	);
}

module.exports = config;