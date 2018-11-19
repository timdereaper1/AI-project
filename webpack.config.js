const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const webpackLiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	target: 'web',
	entry: {
		main: path.join(__dirname, './src/client/index.js')
	},
	output: {
		path: path.join(__dirname, './src/server/static/'),
		filename: '[name].entry.js'
	},
	module: {
		rules: [
			{
				test: /[A-Za-z0-9-_.]*\.css/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					}
				]
			},
			// WOFF Font
			{
				test: [/\.woff(\?v=\d+\.\d+\.\d+)?$/, /\.woff2(\?v=\d+\.\d+\.\d+)?$/],
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff'
					}
				}
			},
			// TTF Font
			{
				test: [/\.ttf(\?v=\d+\.\d+\.\d+)?$/, /\.eot(\?v=\d+\.\d+\.\d+)?$/],
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/octet-stream'
					}
				}
			},
			// SVG Font
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'image/svg+xml'
					}
				}
			},
			// Common Image Formats
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: 'url-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				uglifyOptions: {
					compress: {
						warnings: false,
						// Disabled because of an issue with Uglify breaking seemingly valid code:
						// https://github.com/facebookincubator/create-react-app/issues/2376
						// Pending further investigation:
						// https://github.com/mishoo/UglifyJS2/issues/2011
						comparisons: false
						// drop_console: true
					},
					output: {
						comments: false,
						// Turned on because emoji and regex is not minified properly using default
						// https://github.com/facebookincubator/create-react-app/issues/2488
						ascii_only: true
					}
				}
			})
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	plugins: [new webpack.HotModuleReplacementPlugin(), new webpackLiveReloadPlugin()]
};
