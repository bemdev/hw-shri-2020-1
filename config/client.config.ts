import webpack, { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import autoprefixer from 'autoprefixer';

import { createTarget } from './config';
const cfg = createTarget('client');

const filter = (arr: [string]) => arr.filter(Boolean);

export default {
	...cfg.webpack,

	entry: {
		main: filter([
			//cfg.isDevelopment && 'webpack-hot-middleware/client?reload=true',
			cfg.webpack.entry,
		]),
	},

	module: {
		...cfg.webpack.module,

		rules: [
			...cfg.webpack.module.rules,

			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader' },
				],
			},
		],
	},

	plugins: [
		...cfg.webpack.plugins,

		new MiniCssExtractPlugin({
			filename: cfg.isDevelopment ? '[name].css' : '[hash:16].css',
		}),

		new webpack.NamedModulesPlugin(),
	],
};
