const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob-all');
const webpack = require('webpack');

const config = {
	context: __dirname,

	entry: {
		app: glob.sync([
			'!./development/js/app2/*.js',
			'./development/js/app2/components/**/*.js',
			'./development/js/app2/*.js',
		]),
	},

	output: {
		path: `${__dirname}/WEBPACK_TEST`,
		//filename: '[name].js'
		filename: 'app2.js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules(?!\/(vue-clicky))|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader'
					}
				}
			},
			{
				test: /\.(tpl|htm)$/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true,
						removeComments: false,
						collapseWhitespace: true
					}
				}]
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use:
						process.env.NODE_ENV === 'dev'
						? 'css-loader?sourceMap'
						: 'css-loader'
				})
			},
		]
	},

	plugins: [
		new webpack.ProvidePlugin({
			//$: 'jquery',
			//jQuery: 'jquery',
			Vue: 'vue/dist/vue.js'
		})
	],

	devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : false,

	watch: process.env.NODE_ENV === 'dev',

	watchOptions: {
		aggregateTimeout: 300
	}
}

if (process.env.NODE_ENV === 'build') {
	config.plugins.push(
		new UglifyJsPlugin({})
	);
}

module.exports = config;

