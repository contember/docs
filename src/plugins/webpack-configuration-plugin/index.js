const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (context, options) {
	return {
		name: 'docusaurus-webpack-configuration-plugin',
		configureWebpack(config, isServer, utils) {
			return {
				plugins: [new MiniCssExtractPlugin()],
				module: {
					rules: [
						{
							test: /\.s[ac]ss$/i,
							use: [
								MiniCssExtractPlugin.loader,
								// 'style-loader',
								'css-loader',
								{
									loader: 'sass-loader',
									options: {
										sassOptions: {
											importer: globImporter()
										}
									}
								},
							],
						},
						// {
						// 	test: /\.svg$/,
						// 	loader: 'svg-inline-loader'
						// },
						{
							test: /\.(png|jpe?g|gif|woff2?|otf|svg)$/i,
							loader: 'file-loader',
							options: {
								name: '[path][name].[ext]',
							},
						}
					],
				},
			};
		},
	};
};
