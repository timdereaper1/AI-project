const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const webpackLiveReloadPlugin = require('webpack-livereload-plugin');
const webpackBar = require('webpackbar');
const webpackLoggerPlugin = require('webpack-logger-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	mode: 'development',
	target: 'web',
	entry: {
		main: ['react-hot-loader/patch', path.join(__dirname, '../client/index.js')]
	},
	output: {
		path: path.join(__dirname, '../server/static/'),
		filename: '[name].entry.js',
		publicPath: '/static/',
		hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
		hotUpdateMainFilename: '.hot/[hash].hot-update.json'
	},
	module: {
		rules: [
			{
				test: /[A-Za-z0-9-_.]*\.css/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							// https://webpack.js.org/plugins/mini-css-extract-plugin/
							publicPath: '/static/'
						}
					},
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
				loader: 'babel-loader',
				options: { cacheDirectory: true }
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
				parallel: true
			})
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpackLiveReloadPlugin(),
		new webpackBar(),
		new webpackLoggerPlugin(),
		new openBrowserPlugin({ url: 'http://localhost:5000' }),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			// https://webpack.js.org/plugins/mini-css-extract-plugin/
			filename: 'styles.css'
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/temps/dev.html'),
			filename: path.join(__dirname, '../server/templates/index.html')
		})
	],
	stats: 'errors-only'
};
