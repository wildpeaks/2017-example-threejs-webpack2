/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = ({debug = false} = {}) => {
	const plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(debug ? 'development' : 'production')
		}),
		new HtmlWebpackPlugin({
			title: 'Example',
			filename: 'index.html'
		})
	];
	if (!debug){
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: 'source-map',
				compress: {
					warnings: false
				},
				output: {
					comments: false
				}
			})
		);
	}

	return {
		target: 'web',
		devtool: 'source-map',
		entry: './src/application.js',
		output: {
			path: path.resolve(__dirname, 'www'),
			filename: debug ? 'bundle.js' : 'bundle.min.js',
			publicPath: ''
		},
		plugins,
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [
						path.resolve(__dirname, 'src')
					],
					loader: 'babel-loader',
					query: {
						compact: true,
						presets: [
							['es2015', {modules: false}]
						]
					}
				}
			]
		},
		performance: {
			hints: false
		}
	};
};
