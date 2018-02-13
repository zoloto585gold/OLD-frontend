const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob-all');
const webpack = require('webpack');

const config = {
	context: __dirname,

	entry: {
		app: glob.sync([
			'!./development/js/app2/global/**/*.js',
			'./development/js/app2/components/**/*.js',
			'./development/js/app2/global/**/*.js',
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

module.exports = config;

